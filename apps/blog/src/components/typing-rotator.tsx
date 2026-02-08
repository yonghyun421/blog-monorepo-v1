"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface TypingRotatorProps {
  words: readonly string[];
  className?: string;
}

type Phase = "typing" | "pausing" | "deleting";

const TYPING_SPEED = 50;
const DELETING_SPEED = 30;
const PAUSE_DURATION = 2000;

export function TypingRotator({ words, className }: TypingRotatorProps) {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const wordIndexRef = useRef(0);

  const currentWord = words[wordIndexRef.current] ?? "";

  const advanceToNextWord = useCallback(() => {
    wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
  }, [words.length]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, TYPING_SPEED);
      } else {
        setPhase("pausing");
      }
    } else if (phase === "pausing") {
      timer = setTimeout(() => {
        setPhase("deleting");
      }, PAUSE_DURATION);
    } else if (phase === "deleting") {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, DELETING_SPEED);
      } else {
        advanceToNextWord();
        setPhase("typing");
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, phase, currentWord, advanceToNextWord]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-blink" aria-hidden="true">
        |
      </span>
    </span>
  );
}
