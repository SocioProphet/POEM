#!/usr/bin/env python3
"""Sample: generate embeddings using the provided OpenAI-compatible endpoint.

Reads a few blocks from templates.txt and prints the embedding size for each.
Run this first to verify the endpoint is reachable and working.

Usage:
    python embeddings/sample_embeddings.py
"""

import os
import re

from openai import OpenAI

# ---------------------------------------------------------------------------
# Load a handful of template blocks from templates.txt
# ---------------------------------------------------------------------------
_HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_PATH = os.environ.get("TEMPLATES_PATH", os.path.join(_HERE, "templates.txt"))

with open(TEMPLATES_PATH, encoding="utf-8") as f:
    raw = f.read()

all_blocks = [b.strip() for b in re.split(r"\n\n+", raw)]
all_blocks = [b for b in all_blocks if b and not b.startswith("===")]

# Take just the first 3 blocks as a sample
texts = all_blocks[:3]

# ---------------------------------------------------------------------------
# Call the embeddings endpoint (exactly as provided)
# ---------------------------------------------------------------------------
_BASE_URL = os.environ.get("EMBED_BASE_URL", "http://idea-llm-02.idea.rpi.edu:1234/v1")
_MODEL    = os.environ.get("EMBED_MODEL", "qwen3-embedding:latest")
client = OpenAI(base_url=_BASE_URL, api_key="not-needed")

response = client.embeddings.create(
    model=_MODEL,
    input=texts
)

# Print embedding size for each sentence
for i, emb in enumerate(response.data):
    print(f"Text {i} embedding length:", len(emb.embedding))
    print(f"  Preview: {texts[i][:80]}...")
    print()
    print(emb.embedding)
