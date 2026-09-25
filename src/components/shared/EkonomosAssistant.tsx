"use client";

import Link from "next/link";
import {
  ArrowUp,
  Bot,
  ExternalLink,
  MessageSquareText,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  findAssistantAnswer,
  quickQuestions,
  type AssistantAnswer,
} from "@/lib/assistant/knowledge";
import styles from "./EkonomosAssistant.module.css";

type ChatMessage =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; response: AssistantAnswer };

const welcomeAnswer: AssistantAnswer = {
  id: "welcome",
  answer:
    "Dobrý den. Stručně vysvětlím EkonomOS podle ověřených podkladů projektu. Na co se chcete zeptat?",
  links: [],
};

export default function EkonomosAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: "assistant", response: welcomeAnswer },
  ]);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const messageId = useRef(1);

  const closePanel = () => {
    setIsOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  };

  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const ask = (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    const userId = messageId.current++;
    const answerId = messageId.current++;
    setMessages((current) => [
      ...current,
      { id: userId, role: "user", text: cleanQuestion },
      {
        id: answerId,
        role: "assistant",
        response: findAssistantAnswer(cleanQuestion),
      },
    ]);
    setInput("");
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(input);
  };

  const onLauncherKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div className={styles.root}>
      {isOpen && (
        <div
          id="ekonomos-assistant-panel"
          ref={panelRef}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ekonomos-assistant-title"
          aria-describedby="ekonomos-assistant-note"
        >
          <header className={styles.header}>
            <div className={styles.identity}>
              <div className={styles.mark} aria-hidden="true">
                <Bot size={19} />
              </div>
              <div>
                <div className={styles.eyebrow}>Dokumentační průvodce // online</div>
                <div id="ekonomos-assistant-title" className={styles.title}>
                  Asistent EkonomOS
                </div>
              </div>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={closePanel}
              aria-label="Zavřít asistenta"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div
            ref={messagesRef}
            className={styles.messages}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            <p id="ekonomos-assistant-note" className={styles.notice}>
              Průvodce odpovídá z dokumentace EkonomOS. Nemá přístup k vašim
              účetním datům.
            </p>

            {messages.map((message) =>
              message.role === "user" ? (
                <div key={message.id} className={`${styles.row} ${styles.rowUser}`}>
                  <div className={`${styles.bubble} ${styles.bubbleUser}`}>
                    {message.text}
                  </div>
                </div>
              ) : (
                <div key={message.id} className={styles.row}>
                  <div className={styles.bubble}>
                    <div className={styles.answerLabel}>
                      <Sparkles size={11} aria-hidden="true" />
                      EkonomOS
                    </div>
                    <p>{message.response.answer}</p>
                    {message.response.links.length > 0 && (
                      <div className={styles.links} aria-label="Související odkazy">
                        {message.response.links.map((link) => (
                          <Link key={link.href} href={link.href} className={styles.link}>
                            {link.label}
                            <ExternalLink size={10} aria-hidden="true" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}

            {messages.length === 1 && (
              <div>
                <div className={styles.quickHeading}>Rychlé otázky</div>
                <div className={styles.quickList}>
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      className={styles.quick}
                      onClick={() => ask(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.composer}>
            <form className={styles.form} onSubmit={onSubmit}>
              <label htmlFor="ekonomos-assistant-input" className="sr-only">
                Dotaz pro průvodce EkonomOS
              </label>
              <input
                ref={inputRef}
                id="ekonomos-assistant-input"
                className={styles.input}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={280}
                autoComplete="off"
                placeholder="Zeptejte se na produkt…"
              />
              <button
                type="submit"
                className={styles.send}
                disabled={!input.trim()}
                aria-label="Odeslat dotaz"
              >
                <ArrowUp size={17} aria-hidden="true" />
              </button>
            </form>
            <p className={styles.privacy}>
              Bez ukládání a odesílání. Nevkládejte osobní ani účetní údaje.
            </p>
          </div>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        className={`${styles.launcher} ${isOpen ? styles.launcherOpen : ""}`}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={onLauncherKeyDown}
        aria-label={isOpen ? "Zavřít asistenta EkonomOS" : "Otevřít asistenta EkonomOS"}
        aria-expanded={isOpen}
        aria-controls="ekonomos-assistant-panel"
      >
        <MessageSquareText size={23} aria-hidden="true" />
      </button>
    </div>
  );
}
