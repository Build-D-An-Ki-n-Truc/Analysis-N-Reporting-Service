export function getDiscountStatusDashboard(brandId: string) {
  return {
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
      "id": null,
      "links": [],
      "panels": [
        {
          "datasource": {
            "type": "datasource",
            "uid": "-- Mixed --"
          },
          "fieldConfig": {
            "defaults": {
              "color": {
                "mode": "thresholds"
              },
              "custom": {
                "axisBorderShow": false,
                "axisCenteredZero": false,
                "axisColorMode": "text",
                "axisLabel": "",
                "axisPlacement": "auto",
                "fillOpacity": 80,
                "gradientMode": "none",
                "hideFrom": {
                  "legend": false,
                  "tooltip": false,
                  "viz": false
                },
                "lineWidth": 1,
                "scaleDistribution": {
                  "type": "linear"
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
            "barRadius": 0,
            "barWidth": 0.97,
            "fullHighlight": false,
            "groupWidth": 0.7,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom",
              "showLegend": true
            },
            "orientation": "auto",
            "showValue": "auto",
            "stacking": "none",
            "tooltip": {
              "mode": "single",
              "sort": "none"
            },
            "xTickLabelRotation": 0,
            "xTickLabelSpacing": 0
          },
          "pluginVersion": "11.3.0-75420",
          "targets": [
            {
              "datasource": {
                "type": "grafana-mongodb-datasource",
                "uid": "edx4atc16l0jke"
              },
              "parsedQuery": "db.events.find({\"brand_id\":\"" + brandId + "\"}, {\"_id\":0,\"event_id\":\"$_id\",\"name\":1,\"start_date\":1,\"end_date\":1});",
              "query": "db.events.find(\r\n  { brand_id: \"" + brandId + "\" },\r\n  {\r\n    _id: 0,                   // Exclude the original _id field\r\n    event_id: \"$_id\",          // Rename _id to event_id\r\n    name: 1,                   // Include other fields (optional)\r\n    start_date: 1,\r\n    end_date: 1\r\n  }\r\n);",
              "queryType": "query",
              "refId": "A"
            },
            {
              "datasource": {
                "type": "grafana-mongodb-datasource",
                "uid": "bdx6vxs6wcruod"
              },
              "hide": false,
              "parsedQuery": "db.vouchers.find({});",
              "query": "db.vouchers.find(\r\n  {}\r\n);",
              "queryType": "query",
              "refId": "B"
            }
          ],
          "title": "Vouchers' Status",
          "transformations": [
            {
              "id": "joinByField",
              "options": {
                "byField": "event_id",
                "mode": "outerTabular"
              }
            },
            {
              "id": "filterFieldsByName",
              "options": {
                "include": {
                  "names": [
                    "_id",
                    "status"
                  ]
                }
              }
            },
            {
              "id": "filterByValue",
              "options": {
                "filters": [
                  {
                    "config": {
                      "id": "isNull",
                      "options": {}
                    },
                    "fieldName": "_id"
                  }
                ],
                "match": "any",
                "type": "exclude"
              }
            },
            {
              "id": "groupBy",
              "options": {
                "fields": {
                  "_id": {
                    "aggregations": [
                      "count"
                    ],
                    "operation": "aggregate"
                  },
                  "status": {
                    "aggregations": [
                      "count"
                    ],
                    "operation": "groupby"
                  }
                }
              }
            }
          ],
          "type": "barchart"
        },
        {
          "datasource": {
            "type": "datasource",
            "uid": "-- Mixed --"
          },
          "fieldConfig": {
            "defaults": {
              "color": {
                "mode": "thresholds"
              },
              "custom": {
                "axisBorderShow": false,
                "axisCenteredZero": false,
                "axisColorMode": "text",
                "axisLabel": "",
                "axisPlacement": "auto",
                "fillOpacity": 80,
                "gradientMode": "none",
                "hideFrom": {
                  "legend": false,
                  "tooltip": false,
                  "viz": false
                },
                "lineWidth": 1,
                "scaleDistribution": {
                  "type": "linear"
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
                    "color": "semi-dark-orange",
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
            "x": 12,
            "y": 0
          },
          "id": 2,
          "options": {
            "barRadius": 0,
            "barWidth": 0.97,
            "fullHighlight": false,
            "groupWidth": 0.7,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom",
              "showLegend": true
            },
            "orientation": "horizontal",
            "showValue": "auto",
            "stacking": "none",
            "tooltip": {
              "mode": "single",
              "sort": "none"
            },
            "xTickLabelRotation": 0,
            "xTickLabelSpacing": 0
          },
          "pluginVersion": "11.3.0-75420",
          "targets": [
            {
              "datasource": {
                "type": "grafana-mongodb-datasource",
                "uid": "edx4atc16l0jke"
              },
              "parsedQuery": "db.events.find({\"brand_id\":\"" + brandId + "\"}, {\"_id\":0,\"event_id\":\"$_id\",\"name\":1,\"start_date\":1,\"end_date\":1});",
              "query": "db.events.find(\r\n  { brand_id: \"" + brandId + "\" },\r\n  {\r\n    _id: 0,                   // Exclude the original _id field\r\n    event_id: \"$_id\",          // Rename _id to event_id\r\n    name: 1,                   // Include other fields (optional)\r\n    start_date: 1,\r\n    end_date: 1\r\n  }\r\n);",
              "queryType": "query",
              "refId": "A"
            },
            {
              "datasource": {
                "type": "grafana-mongodb-datasource",
                "uid": "bdx6vxs6wcruod"
              },
              "hide": false,
              "parsedQuery": "db.vouchers.find({});",
              "query": "db.vouchers.find(\r\n  {}\r\n);",
              "queryType": "query",
              "refId": "B"
            }
          ],
          "title": "Voucher is for online usage?",
          "transformations": [
            {
              "id": "joinByField",
              "options": {
                "byField": "event_id",
                "mode": "outerTabular"
              }
            },
            {
              "id": "filterFieldsByName",
              "options": {
                "include": {
                  "names": [
                    "_id",
                    "online"
                  ]
                }
              }
            },
            {
              "id": "filterByValue",
              "options": {
                "filters": [
                  {
                    "config": {
                      "id": "isNull",
                      "options": {}
                    },
                    "fieldName": "_id"
                  }
                ],
                "match": "any",
                "type": "exclude"
              }
            },
            {
              "id": "convertFieldType",
              "options": {
                "conversions": [
                  {
                    "destinationType": "string",
                    "targetField": "online"
                  }
                ],
                "fields": {}
              }
            },
            {
              "id": "groupBy",
              "options": {
                "fields": {
                  "_id": {
                    "aggregations": [
                      "count"
                    ],
                    "operation": "aggregate"
                  },
                  "online": {
                    "aggregations": [],
                    "operation": "groupby"
                  },
                  "status": {
                    "aggregations": [
                      "count"
                    ],
                    "operation": "groupby"
                  }
                }
              }
            }
          ],
          "type": "barchart"
        },
        {
          "datasource": {
            "type": "datasource",
            "uid": "-- Mixed --"
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
            "y": 8
          },
          "id": 3,
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
          "pluginVersion": "11.3.0-75420",
          "targets": [
            {
              "datasource": {
                "type": "grafana-mongodb-datasource",
                "uid": "edx4atc16l0jke"
              },
              "parsedQuery": "db.events.find({\"brand_id\":\"" + brandId + "\"}, {\"_id\":0,\"event_id\":\"$_id\",\"name\":1,\"start_date\":1,\"end_date\":1,\"voucher_quantity\":1});",
              "query": "db.events.find(\r\n  { brand_id: \"" + brandId + "\" },\r\n  {\r\n    _id: 0,                   // Exclude the original _id field\r\n    event_id: \"$_id\",          // Rename _id to event_id\r\n    name: 1,                   // Include other fields (optional)\r\n    start_date: 1,\r\n    end_date: 1,\r\n    voucher_quantity: 1\r\n  }\r\n);",
              "queryType": "query",
              "refId": "A"
            },
            {
              "datasource": {
                "type": "grafana-mongodb-datasource",
                "uid": "bdx6vxs6wcruod"
              },
              "hide": false,
              "parsedQuery": "db.vouchers.find({});",
              "query": "db.vouchers.find(\r\n  {}\r\n);",
              "queryType": "query",
              "refId": "B"
            }
          ],
          "title": "Voucher's expiry date and value",
          "transformations": [
            {
              "id": "joinByField",
              "options": {
                "byField": "event_id",
                "mode": "outerTabular"
              }
            },
            {
              "id": "filterFieldsByName",
              "options": {
                "include": {
                  "names": [
                    "expiration_date",
                    "value",
                    "_id"
                  ]
                }
              }
            },
            {
              "id": "filterByValue",
              "options": {
                "filters": [
                  {
                    "config": {
                      "id": "isNull",
                      "options": {}
                    },
                    "fieldName": "_id"
                  }
                ],
                "match": "any",
                "type": "exclude"
              }
            },
            {
              "id": "renameByRegex",
              "options": {
                "regex": "/value/",
                "renamePattern": "% discount"
              }
            }
          ],
          "type": "timeseries"
        }
      ],
      "preload": false,
      "refresh": "5s",
      "schemaVersion": 39,
      "tags": [],
      "templating": {
        "list": []
      },
      "time": {
        "from": "2024-08-17T07:45:39.250Z",
        "to": "2024-08-30T01:09:51.018Z"
      },
      "timepicker": {},
      "timezone": "browser",
      "title": "Discount Status for " + brandId,
      "uid": null,
      "weekStart": ""
    },
    "message": "Made changes to xyz",
    "overwrite": true
  }
}