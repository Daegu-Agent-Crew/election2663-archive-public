const fs = require('fs');
const path = require('path');
const { default: OpenAI, toFile } = require('/data/data/com.termux/files/home/.npm-global/lib/node_modules/openclaw/node_modules/openai');

const client = new OpenAI();

const referencePath = '/data/data/com.termux/files/home/.openclaw/workspace/agent_builder_public/assets/daeguru/daeguru_9.png';
const outputDir = '/data/data/com.termux/files/home/.openclaw/workspace/election2663-archive-public/assets/news/election2663-day06-report';

// Day 06: D-4, 4건 여론조사 초접전 + 2차 TV토론회 + 사전투표 시작
const scenes = [
  {
    filename: 'cover.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot stands confidently on a debate stage podium, holding a ballot paper in one claw and a magnifying glass in the other. Behind it, two larger podium silhouettes face each other. Infographic elements: a countdown clock showing D-4, ballot box icon, spotlight beams, VS symbol between podiums, small percentage labels floating in the air. Use peach and lavender accents, clean composition, subtle shadows, and a polished blog-illustration feel.',
  },
  {
    filename: '01.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot stands in front of four floating survey result cards arranged in a grid, each showing a different colored bar chart. The mascot looks puzzled with a tilted head, comparing the cards. Infographic elements: four distinct bar chart icons with slightly different bar heights, magnifying glass, question mark icons, percentage symbols, dotted comparison lines between charts. Use light blue and mint accents, clean grid layout, subtle shadows, and a polished blog-illustration feel.',
  },
  {
    filename: '02.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot sits at a news anchor desk with a large TV screen behind showing three podium silhouettes in a heated debate. The mascot holds a clipboard and points at the screen with intensity. Sparks and lightning bolts fly between the podiums. Infographic elements: TV screen frame, microphone icons, speech bubble icons, lightning bolt symbols, on-air indicator light, debate stage floor plan. Use warm coral and peach accents, dynamic composition, subtle shadows, and a polished blog-illustration feel.',
  },
  {
    filename: '03.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot excitedly drops a ballot into a transparent ballot box, while a line of small silhouette figures stretches behind it. A large clock shows early morning hours. Infographic elements: ballot box icon, percentage gauge, clock icon, people queue icons, upward trending arrow, calendar with circled date, flag icon. Use lavender and purple accents, clean geometry, subtle shadows, and a polished blog-illustration feel.',
  },
  {
    filename: '04.png',
    prompt: 'Create a kawaii minimalist editorial illustration on a pure white background with no text. Preserve the mascot identity from the reference image: a cute chibi crustacean-like mascot with rounded body, big sparkling eyes, simple black outline, tiny legs, and oversized claws. Scene: the mascot holds a large clipboard with a checklist, standing next to a roadmap board showing milestone pins on a timeline stretching to a finish line flag. The mascot looks determined and ready. Infographic elements: timeline bar with milestone markers, checklist icons, pin location markers, finish line flag, progress bar, clipboard icon, compass icon. Use mint and light green accents, dynamic but uncluttered composition, subtle shadows, and a polished blog-illustration feel.',
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
