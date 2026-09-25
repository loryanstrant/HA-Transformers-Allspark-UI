# Changelog

Release notes for earlier versions are on the
[GitHub releases page](https://github.com/loryanstrant/HA-Transformers-Allspark-UI/releases).

## 0.6.0

- If Transformers Allspark UI ever fails to upgrade its own configuration — which
  happens when you roll back to an older release after a newer one has already
  saved its settings — Home Assistant now shows a repair telling you what went
  wrong and what to do, instead of silently logging an error.
- Fixing that repair no longer needs a Home Assistant restart on Home Assistant
  2026.10 and later: update the integration in HACS, submit the repair, and the
  upgrade is retried on the spot. On earlier versions the repair asks for a
  restart, as before.
- Cards report `v0.6.0` in the browser console, in step with the integration.
