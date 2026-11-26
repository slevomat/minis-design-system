#!/usr/bin/env python3
"""Fill a page-to-figma build script with one run's values.

    python3 fill-template.py build.homepage.js content.json "Homepage" 1280 xl 0 > out.js

The content JSON (real page texts) stays in the run's cache folder outside the repo; the
filled script goes to stdout so it is never written into the repo by accident.
"""
import json, sys

if len(sys.argv) != 7:
    sys.exit(__doc__)
tpl, content, page, width, mode, x = sys.argv[1:]
src = open(tpl, encoding='utf-8').read()
data = json.load(open(content, encoding='utf-8'))
for k, v in {'__PAGE__': page, '__WIDTH__': width, '__MODE__': mode, '__X__': x,
             '__CONTENT__': json.dumps(data, ensure_ascii=False)}.items():
    if k not in src:
        sys.exit(f'placeholder {k} missing in {tpl}')
    src = src.replace(k, v)
sys.stdout.write(src)
