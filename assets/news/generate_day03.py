#!/usr/bin/env python3
"""
Generate Day 03 report illustrations using ChatGPT Image 2.0 (gpt-image-1)
via Codex's OpenAI connection.

Usage: python3 generate_day03.py
Requires: OPENAI_API_KEY env var
"""
import os, base64, sys
from pathlib import Path

try:
    from openai import OpenAI
except ImportError:
    print("ERROR: pip install openai")
    sys.exit(1)

client = OpenAI()

REF_IMAGE = Path(__file__).parent.parent / "daeguru/daeguru_9.png"
OUT_DIR = Path(__file__).parent / "election2663-day03-report"

if not REF_IMAGE.exists():
    # Try alternative path
    alt = Path.home() / ".openclaw/workspace/agent_builder_public/assets/daeguru/daeguru_9.png"
    if alt.exists():
        REF_IMAGE = alt
    else:
        print(f"ERROR: Reference image not found at {REF_IMAGE} or {alt}")
        sys.exit(1)

print(f"Reference: {REF_IMAGE}")
print(f"Output: {OUT_DIR}")

SCENES = [
    dict(
        name="cover.png",
        prompt=(
            "Using ONLY the character shown in the reference image (the cute chibi lobster/crayfish mascot), "
            "draw a new illustration: The mascot is holding a large magnifying glass examining a cluster of poll result cards floating in the air, "
            "with a calendar showing a countdown in the background. "
            "Style: soft pastel watercolor, peach/lavender tones, "
            "kawaii minimalist, white background, NO TEXT, clean edges."
        ),
    ),
    dict(
        name="01.png",
        prompt=(
            "Using ONLY the character shown in the reference image (the cute chibi lobster/crayfish mascot), "
            "draw: the mascot sitting at a small desk with a stack of newspaper clippings, "
            "carefully sorting them into labeled folders. A small clock shows morning time. "
            "Style: soft pastel watercolor, light blue/mint tones, "
            "kawaii minimalist, white background, NO TEXT."
        ),
    ),
    dict(
        name="02.png",
        prompt=(
            "Using ONLY the character shown in the reference image (the cute chibi lobster/crayfish mascot), "
            "draw: the mascot standing in front of a large whiteboard with bar charts comparing two columns side by side. "
            "A thought bubble shows a phone icon and a telephone interview icon. "
            "Style: soft pastel watercolor, lavender/purple tones, "
            "kawaii minimalist, white background, NO TEXT."
        ),
    ),
    dict(
        name="03.png",
        prompt=(
            "Using ONLY the character shown in the reference image (the cute chibi lobster/crayfish mascot), "
            "draw: the mascot looking at two speech bubbles colliding with spark effects, "
            "representing a heated debate. A TV camera icon is nearby. "
            "Style: soft pastel watercolor, warm coral/peach tones, "
            "kawaii minimalist, white background, NO TEXT."
        ),
    ),
    dict(
        name="04.png",
        prompt=(
            "Using ONLY the character shown in the reference image (the cute chibi lobster/crayfish mascot), "
            "draw: the mascot holding a clipboard with a checklist, looking determined and ready for action. "
            "Small icons (house, school building, market stall) floating around. "
            "Style: soft pastel watercolor, mint/light green tones, "
            "kawaii minimalist, white background, NO TEXT."
        ),
    ),
]


def generate(scene: dict) -> Path:
    out_path = OUT_DIR / scene["name"]
    with open(REF_IMAGE, "rb") as f:
        ref_bytes = f.read()

    result = client.images.edit(
        model="gpt-image-1",
        image=ref_bytes,
        prompt=scene["prompt"],
        size="1024x1024",
        quality="high",
    )

    img_b64 = result.data[0].b64_json
    img_bytes = base64.b64decode(img_b64)
    out_path.write_bytes(img_bytes)
    print(f"  ✓ {scene['name']} ({len(img_bytes)//1024}KB)")
    return out_path


if __name__ == "__main__":
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for scene in SCENES:
        try:
            generate(scene)
        except Exception as e:
            print(f"  ✗ {scene['name']}: {e}")
    print("\n완료!")
