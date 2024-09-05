export const dashboards = [
  // Games
  {
    "dashboard": {
      "annotations": {
          "list": [
          {
              "builtIn": 1,
              "datasource": {
              "type": "grafana",
              "uid": "-- Grafana --"
              },
              "enable": true,
              "hide": true,
              "iconColor": "rgba(0, 211, 255, 1)",
              "name": "Annotations & Alerts",
              "type": "dashboard"
          }
          ]
      },
      "editable": true,
      "fiscalYearStartMonth": 0,
      "graphTooltip": 0,
      "links": [],
      "panels": [
          {
          "datasource": {
              "default": true,
              "type": "prometheus",
              "uid": "bdx0hy95ng6iod"
          },
          "fieldConfig": {
              "defaults": {
              "color": {
                  "mode": "palette-classic"
              },
              "custom": {
                  "axisBorderShow": false,
                  "axisCenteredZero": false,
                  "axisColorMode": "text",
                  "axisLabel": "",
                  "axisPlacement": "auto",
                  "barAlignment": 0,
                  "barWidthFactor": 0.6,
                  "drawStyle": "line",
                  "fillOpacity": 0,
                  "gradientMode": "none",
                  "hideFrom": {
                  "legend": false,
                  "tooltip": false,
                  "viz": false
                  },
                  "insertNulls": false,
                  "lineInterpolation": "linear",
                  "lineWidth": 1,
                  "pointSize": 5,
                  "scaleDistribution": {
                  "type": "linear"
                  },
                  "showPoints": "auto",
                  "spanNulls": false,
                  "stacking": {
                  "group": "A",
                  "mode": "none"
                  },
                  "thresholdsStyle": {
                  "mode": "off"
                  }
              },
              "mappings": [],
              "thresholds": {
                  "mode": "absolute",
                  "steps": [
                  {
                      "color": "green",
                      "value": null
                  },
                  {
                      "color": "red",
                      "value": 80
                  }
                  ]
              }
              },
              "overrides": []
          },
          "gridPos": {
              "h": 8,
              "w": 12,
              "x": 0,
              "y": 0
          },
          "id": 1,
          "options": {
              "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom",
              "showLegend": true
              },
              "tooltip": {
              "mode": "single",
              "sort": "none"
              }
          },
          "targets": [
              {
              "datasource": {
                  "type": "prometheus",
                  "uid": "bdx0hy95ng6iod"
              },
              "disableTextWrap": false,
              "editorMode": "builder",
              "expr": "scrape_duration_seconds{job=\"game-management-service\"}",
              "fullMetaSearch": false,
              "includeNullMetadata": true,
              "instant": false,
              "legendFormat": "__auto",
              "range": true,
              "refId": "A",
              "useBackend": false
              }
          ],
          "title": "Panel Title",
          "type": "timeseries"
          }
      ],
      "schemaVersion": 39,
      "tags": [],
      "templating": {
          "list": []
      },
      "time": {
          "from": "now-6h",
          "to": "now"
      },
      "timepicker": {},
      "timezone": "browser",
      "title": "Games Metrics Data",
      "id": null,
      "uid": null,
      "weekStart": ""
      },
    "message": "Made changes to xyz",
    "overwrite": true
  }
]