const fs = require('fs');
const path = require('path');
const { default: OpenAI, toFile } = require('/data/data/com.termux/files/home/.npm-global/lib/node_modules/openclaw/node_modules/openai');

const ACCESS_TOKEN = process.env.CODEX_ACCESS_TOKEN;
if (!ACCESS_TOKEN) {
  throw new Error('CODEX_ACCESS_TOKEN not set');
}

const client = new OpenAI({
  apiKey: ACCESS_TOKEN,
  baseURL: 'https://api.openai.com/v1',
  defaultHeaders: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
  },
});

const referencePath = '/data/data/com.termux/files/home/.openclaw/workspace/agent_builder_public/assets/daeguru/daeguru_9.png';
const outputDir = '/data/data/com.termux/files/home/.openclaw/workspace/election2663-archive-public/assets/news/election2663-day03-report';

const scenes = [
  {
    filename: 'cover.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot uses a magnifying glass to carefully examine scattered poll cards while a soft calendar backdrop sits behind the action. Use gentle peach and lavender accents, clean composition, subtle shadows, and a polished blog-illustration feel.',
  },
  {
    filename: '01.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot sits at a tidy desk sorting newspaper clippings into neat piles, with a few clipped sheets spread around. Use light blue and mint accents, clean spacing, subtle shadows, and a polished blog-illustration feel.',
  },
  {
    filename: '02.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot stands beside a whiteboard presenting simple bar charts with an energetic pose. Use lavender and purple accents, clean geometry, subtle shadows, and a polished blog-illustration feel.',
  },
  {
    filename: '03.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot watches multiple speech bubbles collide in front of a TV camera, suggesting a noisy campaign media moment. Use coral and peach accents, dynamic but uncluttered composition, subtle shadows, and a polished blog-illustration feel.',
  },
  {
    filename: '04.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot holds a clipboard checklist while simplified civic building icons appear nearby. Use mint and green accents, clean composition, subtle shadows, and a polished blog-illustration feel.',
  },
];

async function generateScene(scene, imageFile) {
  console.log(`Generating ${scene.filename}...`);
  try {
    const response = await client.images.edit({
      model: 'gpt-image-1',
      image: imageFile,
      prompt: scene.prompt,
      size: '1024x1024',
      output_format: 'png',
      quality: 'high',
      background: 'opaque',
      input_fidelity: 'high',
    });

    const image = response.data && response.data[0];
    if (!image || !image.b64_json) {
      throw new Error(`No base64 image returned for ${scene.filename}.`);
    }

    const outputPath = path.join(outputDir, scene.filename);
    fs.writeFileSync(outputPath, Buffer.from(image.b64_json, 'base64'));
    console.log(`Saved ${outputPath} (${Buffer.from(image.b64_json, 'base64').length} bytes)`);
  } catch (err) {
    console.error(`Error generating ${scene.filename}:`, err.message);
    if (err.status) console.error('Status:', err.status);
    if (err.error) console.error('Error body:', JSON.stringify(err.error));
  }
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const referenceBytes = fs.readFileSync(referencePath);
  console.log(`Reference image: ${referenceBytes.length} bytes`);

  for (const scene of scenes) {
    const imageFile = await toFile(referenceBytes, 'daeguru_9.png', { type: 'image/png' });
    await generateScene(scene, imageFile);
  }
  console.log('Done!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
