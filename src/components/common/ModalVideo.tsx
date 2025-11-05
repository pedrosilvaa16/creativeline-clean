"use client";
import { useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  /** "youtube" | "vimeo" — por ora só YouTube no exemplo */
  channel?: "youtube" | "vimeo";
  videoId: string;
};

export default function ModalVideo({ isOpen, onClose, channel = "youtube", videoId }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const src =
    channel === "youtube"
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
      : `https://player.vimeo.com/video/${videoId}?autoplay=1`;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="rounded-xl p-0 backdrop:bg-black/60"
      style={{ width: "min(90vw, 960px)" }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 rounded-full border px-2 py-1 text-sm"
      >
        ✕
      </button>
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        <iframe
          src={src}
          title="Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </div>
    </dialog>
  );
}
