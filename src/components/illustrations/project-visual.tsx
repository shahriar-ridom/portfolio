import { Doodle } from "@/components/doodle";

export function ProjectVisual({ markup, label }: { markup: string; label: string }) {
  return (
    <div className="grid aspect-[8/5] w-full place-items-center rounded-[22px] bg-wash transition-colors duration-300 group-hover:bg-[#f0f1f0]">
      <Doodle
        markup={markup}
        label={`${label} illustration`}
        className="w-[78%] transition-transform duration-500 ease-out group-hover:-translate-y-1"
      />
    </div>
  );
}
