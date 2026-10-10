"""Fallback fetcher. Usage: python3 pytrends_fetch.py "<seed>" "<geo or ''>" "<timeframe>"
Prints {"rising": [...], "top": [...]} as JSON. Requires: pip install pytrends"""
import json
import sys

from pytrends.request import TrendReq

seed, geo, timeframe = sys.argv[1], sys.argv[2], sys.argv[3]
py = TrendReq(hl="en-IN", tz=330, retries=2, backoff_factor=0.5)
py.build_payload([seed], timeframe=timeframe, geo=geo)
related = py.related_queries().get(seed, {})
out = {}
for kind in ("rising", "top"):
    df = related.get(kind)
    out[kind] = [] if df is None else [{"query": r["query"], "value": int(r["value"])} for r in df.to_dict("records")]
print(json.dumps(out))
