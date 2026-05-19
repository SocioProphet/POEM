#!/bin/sh
set -e

CMD="${1:-pipeline}"
shift || true

case "$CMD" in
  templates)
    python generate_text_templates.py
    ;;
  sample)
    python sample_embeddings.py
    ;;
  embed)
    python generate_embeddings.py
    ;;
  search)
    python search_similarity.py "$@"
    ;;
  test)
    python -m pytest test_search_similarity.py -v
    ;;
  pipeline)
    echo "=== Step 1: Generating text templates ==="
    python generate_text_templates.py
    echo ""
    echo "=== Step 2: Generating embeddings ==="
    python generate_embeddings.py
    echo ""
    echo "Pipeline complete. Use 'search' command to query the embeddings."
    ;;
  *)
    echo "Unknown command: $CMD"
    echo "Usage: entrypoint.sh <command> [args]"
    echo ""
    echo "Commands:"
    echo "  pipeline    Run templates then embed (default)"
    echo "  templates   Generate text templates from RDF graph"
    echo "  sample      Verify the embedding endpoint is reachable"
    echo "  embed       Generate and save embeddings as .npy files"
    echo "  search      Search embeddings (pass query as argument)"
    echo "  test        Run the test suite"
    exit 1
    ;;
esac
