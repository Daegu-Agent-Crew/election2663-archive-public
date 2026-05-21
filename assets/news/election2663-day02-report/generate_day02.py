#!/usr/bin/env python3
"""
election2663-day02-report 삽화 생성
ChatGPT Image 2.0 (gpt-image-1) + 대구루 레퍼런스 이미지

사용법:
  pip install openai pillow
  export OPENAI_API_KEY=***
  python3 generate_day02.py
"""
import os, base64
from pathlib import Path
from openai import OpenAI

client = OpenAI()

REF_IMAGE = Path(__file__).parent.parent.parent.parent / "agent_builder_public/assets/daeguru/daeguru_9.png"
OUT_DIR   = Path(__file__).parent

SCENES = [
    dict(
        name="cover.png",
        prompt=(
            "Using ONLY the character shown in the reference image (the cute chibi lobster/crayfish mascot), "
            "draw a new illustration: the character is standing confidently at a podium with a microphone, "
            "waving a small flag, surrounded by confetti and small vote ballot icons. "
            "Election campaign launch day atmosphere. "
            "Style: soft pastel watercolor, bright peach and lavender tones, "
            "kawaii minimalist, white background, NO TEXT, clean edges."
        ),
    ),
    dict(
        name="01.png",
        prompt=(
            "Using ONLY the character shown in the reference image, "
            "draw: the character at a busy street corner in early morning, "
            "bowing and waving to commuters. Small city buildings in background. "
            "Three small figures (one blue, one red, one green) doing the same at different spots. "
            "Style: soft pastel watercolor, warm sunrise orange and light blue tones, "
            "kawaii minimalist, white background, NO TEXT."
        ),
    ),
    dict(
        name="02.png",
        prompt=(
            "Using ONLY the character shown in the reference image, "
            "draw: the character looking intensely at three bar charts side by side, "
            "each showing two bars (blue and red) that are almost exactly the same height. "
            "The character is sweating nervously with a magnifying glass. "
            "Close race tension atmosphere. "
            "Style: soft pastel watercolor, warm coral and peach tones, "
            "kawaii minimalist, white background, NO TEXT."
        ),
    ),
    dict(
        name="03.png",
        prompt=(
            "Using ONLY the character shown in the reference image, "
            "draw: the character holding a clipboard with a checklist, "
            "standing next to a whiteboard showing two columns with icons "
            "(factory gear, graduation cap, robot arm, airplane). "
            "Small speech bubbles with question marks. Policy comparison pose. "
            "Style: soft pastel watercolor, fresh mint and light green tones, "
            "kawaii minimalist, white background, NO TEXT."
        ),
    ),
]


def generate_with_reference(scene: dict) -> Path:
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
    print(f"✓ {scene['name']}")
    return out_path


if __name__ == "__main__":
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for scene in SCENES:
        generate_with_reference(scene)
    print("\n완료!")
