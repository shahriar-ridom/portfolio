"use client";

import { useEffect, useState } from "react";
import { Doodle } from "@/components/doodle";
import { doodleTemplates } from "@/lib/doodle-templates";
import { templateMarkup } from "@/lib/doodle";
import { errorText, hint } from "./styles";

type Props = {
  initialSource: "template" | "upload";
  initialTemplate: string;
  /** Sanitized markup of the stored upload, shown while no new file is chosen. */
  storedUploadMarkup: string | null;
  error?: string;
};

export function DoodlePicker({ initialSource, initialTemplate, storedUploadMarkup, error }: Props) {
  const [source, setSource] = useState(initialSource);
  const [template, setTemplate] = useState(initialTemplate);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Preview the chosen file through <img>, which never runs scripts inside an SVG.
  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const tab = (value: "template" | "upload", text: string) => (
    <label
      className={`cursor-pointer rounded-full border px-4 py-1.5 text-[0.9rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
        source === value ? "border-ink bg-ink text-white" : "border-line-strong text-ink hover:border-ink"
      }`}
    >
      <input
        type="radio"
        name="doodleSource"
        value={value}
        checked={source === value}
        onChange={() => setSource(value)}
        className="sr-only"
      />
      {text}
    </label>
  );

  return (
    <fieldset>
      <legend className="mb-1.5 text-[0.9rem] font-medium text-ink">Doodle</legend>
      <div className="flex gap-2">
        {tab("template", "Choose a template")}
        {tab("upload", "Upload SVG")}
      </div>

      {/* Both panels stay mounted so the file input and radio values always submit. */}
      <input type="hidden" name="doodleTemplate" value={template} />

      <div hidden={source !== "template"} className="mt-4">
        <div role="radiogroup" aria-label="Doodle template" className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {doodleTemplates.map((t) => (
            <button
              key={t.key}
              type="button"
              role="radio"
              aria-checked={template === t.key}
              onClick={() => setTemplate(t.key)}
              className={`rounded-2xl border p-2 text-left transition-colors ${
                template === t.key ? "border-ink bg-wash" : "border-line hover:border-line-strong"
              }`}
            >
              <svg viewBox="0 0 240 150" aria-hidden className="w-full" fill="none" stroke="#232323" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <g dangerouslySetInnerHTML={{ __html: templateMarkup(t.key) }} />
              </svg>
              <span className="mt-1 block text-center text-[0.8rem] text-ink-soft">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div hidden={source !== "upload"} className="mt-4">
        <input
          name="doodleFile"
          type="file"
          accept=".svg,image/svg+xml"
          onChange={(e) => {
            const f = e.target.files?.[0];
            setPreviewUrl(f ? URL.createObjectURL(f) : null);
          }}
          className="block w-full text-[0.9rem] text-ink-soft file:mr-4 file:rounded-full file:border file:border-ink file:bg-transparent file:px-4 file:py-1.5 file:text-ink hover:file:bg-ink hover:file:text-white"
        />
        <p className={hint}>
          One drawing made of paths and basic shapes, 100 KB max. It&apos;s centered, resized to fit and
          cleaned on save: scripts, text, images and gradients are removed.
        </p>
        <div className="mt-3 grid aspect-[8/5] w-full max-w-xs place-items-center rounded-[22px] bg-wash">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="Selected SVG preview" className="max-h-[80%] max-w-[80%]" />
          ) : storedUploadMarkup ? (
            <Doodle markup={storedUploadMarkup} label="Current uploaded doodle" className="w-[78%]" />
          ) : (
            <span className="text-[0.85rem] text-ink-soft">No file chosen</span>
          )}
        </div>
      </div>

      {error && <p role="alert" className={errorText}>{error}</p>}
    </fieldset>
  );
}
