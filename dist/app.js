(() => {
  // src/services/storage.js
  var STORAGE_KEYS = Object.freeze({
    suggestions: "ecologyServiceSuggestions",
    favorites: "ecologyFavoriteTeams",
    questions: "ecologyTeamQuestions",
    wecomAdded: "ecologyWecomAdded"
  });
  function getStorage() {
    try {
      return globalThis.localStorage || null;
    } catch (error) {
      return null;
    }
  }
  function readText(key, fallback = null) {
    try {
      const storage = getStorage();
      if (!storage) return fallback;
      const value = storage.getItem(key);
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  }
  function writeText(key, value) {
    try {
      const storage = getStorage();
      if (!storage) return false;
      storage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }
  function removeValue(key) {
    try {
      const storage = getStorage();
      if (!storage) return false;
      storage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }
  function readJSON(key, fallback) {
    const value = readText(key, null);
    if (value === null) return fallback;
    try {
      return JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }
  function writeJSON(key, value) {
    try {
      return writeText(key, JSON.stringify(value));
    } catch (error) {
      return false;
    }
  }

  // src/services/wecom.js
  function isWecomAdded() {
    return readText(STORAGE_KEYS.wecomAdded, null) === "1";
  }
  function addWecomConsultant() {
    writeText(STORAGE_KEYS.wecomAdded, "1");
    return true;
  }

  // src/data/chatMessages.js
  var chatMessages = {
    "d002": {
      "t001": [
        {
          "type": "system",
          "text": "\u660E\u6CD5\u5F8B\u5E08\u56E2\u961F\u5DF2\u54CD\u5E94\uFF0C\u5E73\u53F0\u52A9\u624B\u5C06\u534F\u52A9\u786E\u8BA4\u57FA\u7840\u9700\u6C42\u4FE1\u606F"
        },
        {
          "type": "team",
          "text": "\u60A8\u597D\uFF01\u6211\u662F\u660E\u6CD5\u5F8B\u5E08\u56E2\u961F\u7684\u674E\u660E\u5F8B\u5E08\u3002\u60F3\u5148\u786E\u8BA4\u4E00\u4E0B\uFF1A3\u4F4D\u5408\u4F19\u4EBA\u4E2D\u662F\u5426\u6709\u6280\u672F\u5165\u80A1\u7684\u60C5\u51B5\uFF1F"
        },
        {
          "type": "user",
          "text": "\u6709\u7684\uFF0C\u5176\u4E2D\u4E00\u4F4D\u662F CTO\uFF0C\u4EE5\u6280\u672F\u5165\u80A1"
        },
        {
          "type": "team",
          "text": "\u660E\u767D\u3002\u6211\u4EEC\u4F1A\u628A\u6280\u672F\u4F5C\u4EF7\u3001\u80A1\u6743\u6BD4\u4F8B\u548C\u9000\u51FA\u673A\u5236\u4E00\u8D77\u7EB3\u5165\u670D\u52A1\u65B9\u6848\u3002"
        }
      ]
    },
    "d001": {
      "t001": [
        {
          "type": "system",
          "text": "\u660E\u6CD5\u5F8B\u5E08\u56E2\u961F\u5DF2\u54CD\u5E94\uFF0C\u53EF\u901A\u8FC7\u5E73\u53F0\u52A9\u624B\u8865\u5145\u9700\u6C42\u4FE1\u606F"
        },
        {
          "type": "team",
          "text": "\u60A8\u597D\uFF01\u5173\u4E8E Pre-A \u878D\u8D44\u6CD5\u5F8B\u670D\u52A1\uFF0C\u60F3\u786E\u8BA4\u6295\u8D44\u65B9\u3001\u9884\u8BA1\u4EA4\u5272\u65F6\u95F4\u548C\u7279\u6B8A\u6761\u6B3E\u9700\u6C42\u3002"
        }
      ],
      "t004": [
        {
          "type": "system",
          "text": "\u5B89\u4FE1\u6CD5\u5F8B\u56E2\u961F\u5DF2\u54CD\u5E94\uFF0C\u53EF\u901A\u8FC7\u5E73\u53F0\u52A9\u624B\u8865\u5145\u9700\u6C42\u4FE1\u606F"
        }
      ],
      "t002": [
        {
          "type": "system",
          "text": "\u6B63\u5927\u6CD5\u52A1\u56E2\u961F\u5DF2\u54CD\u5E94\uFF0C\u53EF\u901A\u8FC7\u5E73\u53F0\u52A9\u624B\u8865\u5145\u9700\u6C42\u4FE1\u606F"
        }
      ]
    }
  };

  // src/data/demands.js
  var demands = [
    {
      "id": "d001",
      "title": "Pre-A\u8F6E\u878D\u8D44\u6CD5\u5F8B\u987E\u95EE",
      "status": "choosing",
      "categoryId": "law",
      "categoryName": "\u6CD5\u5F8B\u670D\u52A1",
      "sku": "\u878D\u8D44\u4EA4\u6613",
      "budget": "3-5\u4E07",
      "clientType": "\u521D\u521B\u4F01\u4E1A\xB7A\u8F6E\u524D",
      "city": "\u5317\u4EAC",
      "date": "2026-08-18",
      "progress": "\u5DF2\u6709 3 \u5BB6\u670D\u52A1\u56E2\u961F\u53EF\u4F9B\u9009\u62E9",
      "responseDeadline": "\u672C\u8F6E\u54CD\u5E94\u5DF2\u7ED3\u675F",
      "totalInvited": 4,
      "responseClosed": true,
      "notificationSent": true,
      "desc": "\u661F\u8FB0\u79D1\u6280Pre-A\u8F6E\u878D\u8D44\uFF0C\u9884\u8BA1\u4EA4\u6613\u989D2000\u4E07\uFF0C\u9700\u8981\u5168\u6D41\u7A0B\u6CD5\u5F8B\u987E\u95EE\u670D\u52A1\uFF0C\u5305\u62EC\u4EA4\u6613\u7ED3\u6784\u8BBE\u8BA1\u3001\u6587\u4EF6\u8D77\u8349\u3001\u8C08\u5224\u652F\u6301\u7B49\u3002",
      "fields": [
        {
          "label": "\u878D\u8D44\u9636\u6BB5",
          "value": "Pre-A\u8F6E"
        },
        {
          "label": "\u9884\u8BA1\u4EA4\u6613\u989D",
          "value": "2000\u4E07\u4EBA\u6C11\u5E01"
        },
        {
          "label": "\u9884\u7B97\u8303\u56F4",
          "value": "3-5\u4E07"
        },
        {
          "label": "\u671F\u671B\u5B8C\u6210\u65F6\u95F4",
          "value": "1\u4E2A\u6708\u5185"
        },
        {
          "label": "\u5B9E\u9645\u529E\u516C\u57CE\u5E02",
          "value": "\u5317\u4EAC\xB7\u6D77\u6DC0\u533A"
        },
        {
          "label": "\u8865\u5145\u63CF\u8FF0",
          "value": "\u5DF2\u6709\u6295\u8D44\u610F\u5411\u65B9\uFF0C\u9700\u5C3D\u5FEB\u542F\u52A8\u3002"
        }
      ],
      "accepted": [
        {
          "teamId": "t001",
          "time": "2\u5C0F\u65F6\u524D",
          "quote": "4\u4E07\xB7\u542B\u5168\u6D41\u7A0B",
          "feedback": "\u6211\u4EEC\u6709\u4E30\u5BCC\u7684Pre-A\u670D\u52A1\u7ECF\u9A8C\uFF0C\u53EF\u4EE5\u5C3D\u5FEB\u542F\u52A8\u3002",
          "needMaterials": [
            "\u73B0\u6709\u80A1\u6743\u7ED3\u6784\u8868",
            "\u6295\u8D44\u610F\u5411\u4E66\u6216TS\u8349\u7A3F",
            "\u516C\u53F8\u7AE0\u7A0B\u73B0\u884C\u7248\u672C"
          ]
        },
        {
          "teamId": "t004",
          "time": "5\u5C0F\u65F6\u524D",
          "quote": "5\u4E07\xB7\u542B\u5168\u6D41\u7A0B",
          "feedback": "\u8D44\u672C\u5E02\u573A\u662F\u6211\u4EEC\u7684\u6838\u5FC3\u4F18\u52BF\uFF0C\u53C2\u4E0E\u8FC7100+\u878D\u8D44\u9879\u76EE\u3002",
          "needMaterials": [
            "\u6700\u8FD1\u4E24\u5E74\u8D22\u52A1\u62A5\u8868",
            "\u6295\u8D44\u65B9\u4E3B\u4F53\u4FE1\u606F"
          ]
        },
        {
          "teamId": "t002",
          "time": "1\u5929\u524D",
          "quote": "3.5\u4E07\xB7\u57FA\u7840\u6D41\u7A0B",
          "feedback": "\u53EF\u4EE5\u63D0\u4F9B\u878D\u8D44\u6CD5\u5F8B\u670D\u52A1\uFF0C\u4F46\u9700\u8981\u4E86\u89E3\u66F4\u591A\u7EC6\u8282\u3002",
          "needMaterials": [
            "\u4EA4\u6613\u7ED3\u6784\u521D\u6B65\u8BBE\u60F3",
            "\u9884\u8BA1\u4EA4\u5272\u65F6\u95F4"
          ]
        }
      ],
      "pending": [],
      "timedOut": [
        {
          "teamId": "t005",
          "time": "08-19 09:20"
        }
      ],
      "rejected": [],
      "timeline": [
        {
          "kind": "sent",
          "title": "\u9700\u6C42\u5DF2\u53D1\u51FA",
          "desc": "\u5DF2\u53D1\u9001\u7ED9 4 \u5BB6\u670D\u52A1\u56E2\u961F",
          "time": "08-18 09:20"
        },
        {
          "kind": "accept",
          "title": "\u6B63\u5927\u6CD5\u52A1\u56E2\u961F \u5DF2\u54CD\u5E94",
          "desc": "\u62A5\u4EF7\u610F\u5411 3.5\u4E07\xB7\u57FA\u7840\u6D41\u7A0B",
          "time": "08-19 15:40"
        },
        {
          "kind": "accept",
          "title": "\u5B89\u4FE1\u6CD5\u5F8B\u56E2\u961F \u5DF2\u54CD\u5E94",
          "desc": "\u62A5\u4EF7\u610F\u5411 5\u4E07\xB7\u542B\u5168\u6D41\u7A0B",
          "time": "08-20 09:10"
        },
        {
          "kind": "accept",
          "title": "\u660E\u6CD5\u5F8B\u5E08\u56E2\u961F \u5DF2\u54CD\u5E94",
          "desc": "\u62A5\u4EF7\u610F\u5411 4\u4E07\xB7\u542B\u5168\u6D41\u7A0B",
          "time": "08-20 12:30"
        }
      ]
    },
    {
      "id": "d002",
      "title": "\u5408\u4F19\u4EBA\u80A1\u6743\u5206\u914D\u65B9\u6848\u8BBE\u8BA1",
      "status": "active",
      "categoryId": "law",
      "categoryName": "\u6CD5\u5F8B\u670D\u52A1",
      "sku": "\u80A1\u6743\u67B6\u6784\u8BBE\u8BA1",
      "budget": "1-2\u4E07",
      "clientType": "\u521D\u521B\u4F01\u4E1A\xB7A\u8F6E\u524D",
      "city": "\u5317\u4EAC",
      "date": "2026-08-10",
      "progress": "\u5DF2\u9009\u5B9A\u660E\u6CD5\u5F8B\u5E08\u56E2\u961F\uFF0C\u670D\u52A1\u8FDB\u884C\u4E2D",
      "desc": "3\u4F4D\u5408\u4F19\u4EBA\u80A1\u6743\u5206\u914D\uFF0C\u9700\u8003\u8651\u6280\u672F\u5165\u80A1\u548C\u671F\u6743\u6C60\u8BBE\u8BA1\u3002",
      "fields": [
        {
          "label": "\u5408\u4F19\u4EBA\u6570\u91CF",
          "value": "3\u4EBA"
        },
        {
          "label": "\u9884\u7B97\u8303\u56F4",
          "value": "1-2\u4E07"
        },
        {
          "label": "\u671F\u671B\u5B8C\u6210\u65F6\u95F4",
          "value": "2\u5468\u5185"
        },
        {
          "label": "\u5B9E\u9645\u529E\u516C\u57CE\u5E02",
          "value": "\u5317\u4EAC\xB7\u6D77\u6DC0\u533A"
        }
      ],
      "accepted": [
        {
          "teamId": "t001",
          "time": "3\u5C0F\u65F6\u524D",
          "quote": "1.5\u4E07",
          "feedback": "\u80A1\u6743\u8BBE\u8BA1\u662F\u6211\u4EEC\u7684\u6838\u5FC3\u4E1A\u52A1\uFF0C\u53EF\u4EE5\u5FEB\u901F\u542F\u52A8\u3002",
          "needMaterials": [
            "\u4E09\u4F4D\u5408\u4F19\u4EBA\u51FA\u8D44\u4E0E\u5206\u5DE5\u8BF4\u660E",
            "\u6280\u672F\u5165\u80A1\u7684\u4F5C\u4EF7\u4F9D\u636E"
          ]
        }
      ],
      "pending": [],
      "rejected": [
        {
          "teamId": "t002",
          "time": "08-10 18:20",
          "reason": "\u5F53\u524D\u6392\u671F\u5DF2\u6EE1\uFF0C\u5EFA\u8BAE2\u5468\u540E\u518D\u8054\u7CFB\u3002"
        }
      ],
      "chosenTeam": "t001",
      "servicePlan": {
        "teamId": "t001",
        "scope": "\u5B8C\u6210\u5408\u4F19\u4EBA\u80A1\u6743\u7ED3\u6784\u8BBE\u8BA1\u3001\u671F\u6743\u6C60\u5EFA\u8BAE\u53CA\u914D\u5957\u6587\u4EF6\u8D77\u8349",
        "finalQuote": "1.5\u4E07",
        "period": "2\u5468\u5185",
        "deliverables": [
          "\u80A1\u6743\u7ED3\u6784\u65B9\u6848",
          "\u5408\u4F19\u4EBA\u534F\u8BAE\u4FEE\u8BA2\u5EFA\u8BAE",
          "\u671F\u6743\u6C60\u8BBE\u7F6E\u5EFA\u8BAE"
        ],
        "materials": [
          "\u4E09\u4F4D\u5408\u4F19\u4EBA\u51FA\u8D44\u4E0E\u5206\u5DE5\u8BF4\u660E",
          "\u6280\u672F\u5165\u80A1\u7684\u4F5C\u4EF7\u4F9D\u636E"
        ],
        "confirmedAt": "08-11 14:00"
      },
      "timeline": [
        {
          "kind": "sent",
          "title": "\u9700\u6C42\u5DF2\u53D1\u51FA",
          "desc": "\u5DF2\u53D1\u9001\u7ED9 2 \u5BB6\u670D\u52A1\u56E2\u961F",
          "time": "08-10 10:05"
        },
        {
          "kind": "reject",
          "title": "\u6B63\u5927\u6CD5\u52A1\u56E2\u961F \u6682\u672A\u627F\u63A5",
          "desc": "\u5F53\u524D\u6392\u671F\u5DF2\u6EE1\uFF0C\u5EFA\u8BAE2\u5468\u540E\u518D\u8054\u7CFB\u3002",
          "time": "08-10 18:20"
        },
        {
          "kind": "accept",
          "title": "\u660E\u6CD5\u5F8B\u5E08\u56E2\u961F \u5DF2\u54CD\u5E94",
          "desc": "\u62A5\u4EF7\u610F\u5411 1.5\u4E07",
          "time": "08-11 09:30"
        },
        {
          "kind": "choose",
          "title": "\u5DF2\u9009\u5B9A \u660E\u6CD5\u5F8B\u5E08\u56E2\u961F",
          "desc": "\u8FDB\u5165\u5E73\u53F0\u5185\u6B63\u5F0F\u670D\u52A1",
          "time": "08-11 14:00"
        }
      ]
    },
    {
      "id": "d003",
      "title": "\u5546\u6807\u6CE8\u518C\uFF085\u4EF6\uFF09",
      "status": "done",
      "categoryId": "ip",
      "categoryName": "\u77E5\u8BC6\u4EA7\u6743",
      "sku": "\u5546\u6807\u6CE8\u518C",
      "budget": "3000-5000",
      "clientType": "\u521D\u521B\u4F01\u4E1A\xB7A\u8F6E\u524D",
      "city": "\u5317\u4EAC",
      "date": "2026-07-15",
      "progress": "\u5DF2\u5B8C\u6210\xB7\u5F85\u8BC4\u4EF7",
      "desc": "\u516C\u53F8\u54C1\u724C\u548C\u4EA7\u54C1\u540D\u79F0\u5546\u6807\u6CE8\u518C\uFF0C\u51715\u4EF6\u3002",
      "fields": [
        {
          "label": "\u5546\u6807\u6570\u91CF",
          "value": "5\u4EF6"
        },
        {
          "label": "\u5546\u6807\u7C7B\u578B",
          "value": "\u6587\u5B57\u5546\u6807"
        },
        {
          "label": "\u9884\u7B97\u8303\u56F4",
          "value": "3000-5000\u5143"
        },
        {
          "label": "\u5B9E\u9645\u529E\u516C\u57CE\u5E02",
          "value": "\u5317\u4EAC\xB7\u6D77\u6DC0\u533A"
        }
      ],
      "accepted": [
        {
          "teamId": "t003",
          "time": "1\u5C0F\u65F6\u524D",
          "quote": "4000\u5143\xB75\u4EF6",
          "feedback": "\u53EF\u4EE5\u529E\u7406\uFF0C\u9884\u8BA19-12\u4E2A\u6708\u4E0B\u8BC1\u3002",
          "needMaterials": [
            "\u8425\u4E1A\u6267\u7167\u526F\u672C\u626B\u63CF\u4EF6",
            "\u5546\u6807\u56FE\u6837\u6587\u4EF6",
            "\u62DF\u6CE8\u518C\u7C7B\u522B\u6E05\u5355"
          ]
        }
      ],
      "pending": [],
      "rejected": [],
      "chosenTeam": "t003",
      "servicePlan": {
        "teamId": "t003",
        "scope": "\u5B8C\u6210 5 \u4EF6\u5546\u6807\u7684\u68C0\u7D22\u3001\u6750\u6599\u51C6\u5907\u4E0E\u6CE8\u518C\u7533\u8BF7",
        "finalQuote": "4000\u5143\xB75\u4EF6",
        "period": "9-12\u4E2A\u6708",
        "deliverables": [
          "\u5546\u6807\u68C0\u7D22\u62A5\u544A",
          "\u7533\u8BF7\u6750\u6599",
          "\u5546\u6807\u53D7\u7406\u901A\u77E5\u4E66"
        ],
        "materials": [
          "\u8425\u4E1A\u6267\u7167\u526F\u672C\u626B\u63CF\u4EF6",
          "\u5546\u6807\u56FE\u6837\u6587\u4EF6",
          "\u62DF\u6CE8\u518C\u7C7B\u522B\u6E05\u5355"
        ],
        "confirmedAt": "07-16 09:40"
      },
      "delivery": {
        "summary": "5 \u4EF6\u5546\u6807\u5DF2\u5168\u90E8\u63D0\u4EA4\u7533\u8BF7\u5E76\u53D6\u5F97\u53D7\u7406\u56DE\u6267",
        "files": [
          "\u5546\u6807\u7533\u8BF7\u6E05\u5355.pdf",
          "\u53D7\u7406\u56DE\u6267\uFF085\u4EF6\uFF09.zip"
        ],
        "submittedAt": "08-12 16:50"
      },
      "hasReview": false,
      "completedDate": "2026-08-12",
      "timeline": [
        {
          "kind": "sent",
          "title": "\u9700\u6C42\u5DF2\u53D1\u51FA",
          "desc": "\u5DF2\u53D1\u9001\u7ED9 2 \u5BB6\u670D\u52A1\u56E2\u961F",
          "time": "07-15 11:00"
        },
        {
          "kind": "accept",
          "title": "\u667A\u6743\u77E5\u8BC6\u4EA7\u6743\u56E2\u961F \u5DF2\u54CD\u5E94",
          "desc": "\u62A5\u4EF7\u610F\u5411 4000\u5143\xB75\u4EF6",
          "time": "07-15 16:20"
        },
        {
          "kind": "choose",
          "title": "\u5DF2\u9009\u5B9A \u667A\u6743\u77E5\u8BC6\u4EA7\u6743\u56E2\u961F",
          "desc": "\u8FDB\u5165\u5E73\u53F0\u5185\u6B63\u5F0F\u670D\u52A1",
          "time": "07-16 09:40"
        },
        {
          "kind": "done",
          "title": "\u670D\u52A1\u5DF2\u5B8C\u6210",
          "desc": "5 \u4EF6\u5546\u6807\u5DF2\u5168\u90E8\u63D0\u4EA4\u53D7\u7406",
          "time": "08-12 17:30"
        }
      ]
    },
    {
      "id": "d004",
      "title": "\u516C\u53F8\u6CE8\u518C\uFF08\u79D1\u6280\u7C7B\uFF09",
      "status": "cancelled",
      "categoryId": "business",
      "categoryName": "\u5DE5\u5546\u670D\u52A1",
      "sku": "\u516C\u53F8\u6CE8\u518C",
      "budget": "1000-2000",
      "clientType": "\u521D\u521B\u4F01\u4E1A\xB7A\u8F6E\u524D",
      "city": "\u5317\u4EAC",
      "date": "2026-06-20",
      "progress": "\u5DF2\u7ED3\u675F\xB7\u5168\u90E8\u672A\u627F\u63A5",
      "desc": "\u6CE8\u518C\u4E00\u5BB6\u79D1\u6280\u516C\u53F8\uFF0C\u6CE8\u518C\u8D44\u672C100\u4E07\u3002",
      "fields": [
        {
          "label": "\u516C\u53F8\u7C7B\u578B",
          "value": "\u6709\u9650\u8D23\u4EFB\u516C\u53F8"
        },
        {
          "label": "\u6CE8\u518C\u8D44\u672C",
          "value": "100\u4E07"
        },
        {
          "label": "\u9884\u7B97\u8303\u56F4",
          "value": "1000-2000\u5143"
        }
      ],
      "accepted": [],
      "pending": [],
      "rejected": [
        {
          "teamId": "t005",
          "time": "06-20 15:10",
          "reason": "\u6CE8\u518C\u5730\u5740\u6682\u65F6\u4E0D\u8DB3\uFF0C\u5EFA\u8BAE1\u5468\u540E\u91CD\u65B0\u63D0\u4EA4\u3002"
        }
      ],
      "timeline": [
        {
          "kind": "sent",
          "title": "\u9700\u6C42\u5DF2\u53D1\u51FA",
          "desc": "\u5DF2\u53D1\u9001\u7ED9 1 \u5BB6\u670D\u52A1\u56E2\u961F",
          "time": "06-20 09:15"
        },
        {
          "kind": "reject",
          "title": "\u901F\u6377\u5DE5\u5546\u670D\u52A1 \u6682\u672A\u627F\u63A5",
          "desc": "\u6CE8\u518C\u5730\u5740\u6682\u65F6\u4E0D\u8DB3\uFF0C\u5EFA\u8BAE1\u5468\u540E\u91CD\u65B0\u63D0\u4EA4\u3002",
          "time": "06-20 15:10"
        },
        {
          "kind": "cancel",
          "title": "\u672C\u8F6E\u5339\u914D\u5DF2\u7ED3\u675F",
          "desc": "\u5168\u90E8\u56E2\u961F\u672A\u627F\u63A5\uFF0C\u53EF\u4FEE\u6539\u540E\u91CD\u65B0\u63D0\u4EA4",
          "time": "06-20 15:10"
        }
      ]
    }
  ];

  // src/data/pools.js
  var serviceSuggestions = [];
  var reviewDimensionLabels = {
    "professional": "\u4E13\u4E1A\u80FD\u529B",
    "response": "\u54CD\u5E94\u6548\u7387",
    "communication": "\u6C9F\u901A\u4F53\u9A8C",
    "delivery": "\u4EA4\u4ED8\u8D28\u91CF"
  };
  var caseLibrary = {
    "\u67D0AIGC\u516C\u53F8Pre-A\u8F6E\u878D\u8D44\u6CD5\u5F8B\u987E\u95EE": {
      customer: "AIGC \u521D\u521B\u4F01\u4E1A \xB7 Pre-A \u8F6E",
      challenge: "\u878D\u8D44\u65F6\u95F4\u7D27\uFF0C\u9700\u8981\u540C\u6B65\u68B3\u7406\u5386\u53F2\u80A1\u6743\u3001\u56DE\u5E94\u6295\u8D44\u65B9\u5C3D\u8C03\u5E76\u63A8\u8FDB\u6838\u5FC3\u4EA4\u6613\u6587\u4EF6\u3002",
      service: "\u4EA4\u6613\u7ED3\u6784\u8BBE\u8BA1\u3001\u6CD5\u5F8B\u5C3D\u8C03\u652F\u6301\u3001\u6295\u8D44\u534F\u8BAE\u5BA1\u9605\u4E0E\u4EA4\u5272\u6587\u4EF6\u51C6\u5907\u3002",
      outcome: "\u5B8C\u6210\u672C\u8F6E\u878D\u8D44\u6240\u9700\u7684\u6CD5\u5F8B\u6587\u4EF6\u548C\u4EA4\u5272\u4E8B\u9879\u68B3\u7406\uFF0C\u652F\u6301\u4F01\u4E1A\u8FDB\u5165\u7B7E\u7F72\u9636\u6BB5\u3002",
      period: "\u7EA6 6 \u5468"
    },
    "\u67D0SaaS\u4F01\u4E1A\u5929\u4F7F\u8F6E\u4EA4\u6613\u67B6\u6784\u8BBE\u8BA1": {
      customer: "\u4F01\u4E1A\u670D\u52A1 SaaS \xB7 \u5929\u4F7F\u8F6E",
      challenge: "\u521B\u59CB\u56E2\u961F\u9996\u6B21\u878D\u8D44\uFF0C\u9700\u8981\u786E\u8BA4\u6295\u8D44\u6761\u6B3E\u3001\u63A7\u5236\u6743\u5B89\u6392\u548C\u540E\u7EED\u878D\u8D44\u5F71\u54CD\u3002",
      service: "\u878D\u8D44\u67B6\u6784\u5206\u6790\u3001\u6838\u5FC3\u6761\u6B3E\u5EFA\u8BAE\u3001\u6295\u8D44\u534F\u8BAE\u5BA1\u9605\u53CA\u8C08\u5224\u652F\u6301\u3002",
      outcome: "\u5F62\u6210\u53EF\u7528\u4E8E\u8C08\u5224\u7684\u6761\u6B3E\u6E05\u5355\u548C\u4EA4\u6613\u6587\u4EF6\u4FEE\u6539\u7A3F\u3002",
      period: "\u7EA6 4 \u5468"
    },
    "\u67D0\u667A\u80FD\u786C\u4EF6\u516C\u53F8A\u8F6E\u878D\u8D44\u5168\u7A0B\u6CD5\u5F8B\u670D\u52A1": {
      customer: "\u667A\u80FD\u786C\u4EF6\u4F01\u4E1A \xB7 A \u8F6E",
      challenge: "\u4E1A\u52A1\u5408\u540C\u548C\u77E5\u8BC6\u4EA7\u6743\u6750\u6599\u8F83\u591A\uFF0C\u9700\u8981\u5728\u878D\u8D44\u8FDB\u5EA6\u5185\u5B8C\u6210\u7CFB\u7EDF\u6027\u5C3D\u8C03\u51C6\u5907\u3002",
      service: "\u5C3D\u8C03\u6750\u6599\u68B3\u7406\u3001\u95EE\u9898\u6574\u6539\u3001\u4EA4\u6613\u6587\u4EF6\u8D77\u8349\u4E0E\u7B7E\u7F72\u4EA4\u5272\u652F\u6301\u3002",
      outcome: "\u5B8C\u6210\u6574\u6539\u5EFA\u8BAE\u3001\u4EA4\u6613\u6587\u4EF6\u53CA\u7B7E\u7F72\u4EA4\u5272\u6587\u4EF6\u5305\u3002",
      period: "\u7EA6 8 \u5468"
    },
    "\u67D0\u79D1\u6280\u521D\u521B\u516C\u53F8\u5408\u4F19\u4EBA\u80A1\u6743\u5206\u914D\u65B9\u6848": {
      customer: "\u79D1\u6280\u521D\u521B\u4F01\u4E1A \xB7 \u8054\u5408\u521B\u59CB\u9636\u6BB5",
      challenge: "\u5408\u4F19\u4EBA\u6295\u5165\u65B9\u5F0F\u4E0D\u540C\uFF0C\u9700\u8981\u517C\u987E\u63A7\u5236\u6743\u3001\u957F\u671F\u8D21\u732E\u548C\u4EBA\u5458\u9000\u51FA\u5B89\u6392\u3002",
      service: "\u8D21\u732E\u8981\u7D20\u8BBF\u8C08\u3001\u80A1\u6743\u6BD4\u4F8B\u5EFA\u8BAE\u3001\u6210\u719F\u673A\u5236\u4E0E\u9000\u51FA\u6761\u6B3E\u8BBE\u8BA1\u3002",
      outcome: "\u5F62\u6210\u80A1\u6743\u5206\u914D\u65B9\u6848\u53CA\u914D\u5957\u534F\u8BAE\u8981\u70B9\uFF0C\u4F9B\u521B\u59CB\u56E2\u961F\u786E\u8BA4\u843D\u5730\u3002",
      period: "\u7EA6 3 \u5468"
    },
    "\u67D0\u4E92\u8054\u7F51\u516C\u53F8\u671F\u6743\u6C60\u8BBE\u8BA1\u4E0E\u843D\u5730": {
      customer: "\u4E92\u8054\u7F51\u4F01\u4E1A \xB7 \u878D\u8D44\u524D",
      challenge: "\u9700\u8981\u5728\u65B0\u4E00\u8F6E\u878D\u8D44\u524D\u9884\u7559\u6FC0\u52B1\u7A7A\u95F4\uFF0C\u5E76\u660E\u786E\u6388\u4E88\u548C\u9000\u51FA\u89C4\u5219\u3002",
      service: "\u671F\u6743\u6C60\u89C4\u6A21\u6D4B\u7B97\u3001\u6388\u4E88\u89C4\u5219\u8BBE\u8BA1\u3001\u914D\u5957\u6587\u4EF6\u4E0E\u5B9E\u65BD\u8BF4\u660E\u3002",
      outcome: "\u5B8C\u6210\u671F\u6743\u6C60\u65B9\u6848\u548C\u9996\u6279\u6FC0\u52B1\u5BF9\u8C61\u7684\u5B9E\u65BD\u6587\u4EF6\u3002",
      period: "\u7EA6 4 \u5468"
    }
  };
  var acceptFeedbackPool = {
    "law": [
      "\u8FD9\u7C7B\u6848\u5B50\u6211\u4EEC\u505A\u8FC7\u4E0D\u5C11\uFF0C\u770B\u5B8C\u4F60\u7684\u63CF\u8FF0\u540E\u53EF\u4EE5\u76F4\u63A5\u8FDB\u5165\u65B9\u6848\u6C9F\u901A\u3002",
      "\u60C5\u51B5\u6211\u4EEC\u4E86\u89E3\u4E86\uFF0C\u53EF\u4EE5\u627F\u63A5\u3002\u5EFA\u8BAE\u5148\u505A\u4E00\u6B21 30 \u5206\u949F\u7684\u60C5\u51B5\u68B3\u7406\u518D\u5B9A\u65B9\u6848\u3002",
      "\u5C5E\u4E8E\u6211\u4EEC\u7684\u5E38\u89C4\u627F\u63A5\u8303\u56F4\uFF0C\u4EBA\u624B\u53EF\u4EE5\u6392\u5F00\uFF0C\u968F\u65F6\u80FD\u542F\u52A8\u3002"
    ],
    "business": [
      "\u6750\u6599\u9F50\u7684\u8BDD\u6D41\u7A0B\u5F88\u5FEB\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5168\u7A0B\u4EE3\u529E\u3002",
      "\u53EF\u4EE5\u627F\u63A5\uFF0C\u5177\u4F53\u65F6\u6548\u53D6\u51B3\u4E8E\u5F53\u5730\u7A97\u53E3\u6392\u961F\u60C5\u51B5\u3002"
    ],
    "ip": [
      "\u53EF\u4EE5\u529E\u7406\uFF0C\u6211\u4EEC\u4F1A\u5148\u505A\u4E00\u6B21\u514D\u8D39\u8FD1\u4F3C\u68C0\u7D22\u518D\u786E\u5B9A\u7533\u8BF7\u7B56\u7565\u3002",
      "\u5C5E\u4E8E\u5E38\u89C4\u4E1A\u52A1\uFF0C\u80FD\u627F\u63A5\u3002\u5EFA\u8BAE\u4E00\u5E76\u505A\u9632\u5FA1\u6027\u5E03\u5C40\u3002"
    ],
    "default": [
      "\u770B\u5B8C\u9700\u6C42\u4E86\uFF0C\u6211\u4EEC\u53EF\u4EE5\u627F\u63A5\uFF0C\u7EC6\u8282\u53EF\u5148\u901A\u8FC7\u5E73\u53F0\u52A9\u624B\u8865\u5145\uFF0C\u6DF1\u5165\u4EA4\u6D41\u7531\u5E73\u53F0\u987E\u95EE\u534F\u52A9\u62C9\u7FA4\u3002",
      "\u53EF\u4EE5\u505A\uFF0C\u5EFA\u8BAE\u5148\u8865\u5145\u51E0\u9879\u6750\u6599\u518D\u786E\u8BA4\u6700\u7EC8\u65B9\u6848\u3002"
    ]
  };
  var materialPool = {
    "\u878D\u8D44\u4EA4\u6613": [
      "\u73B0\u6709\u80A1\u6743\u7ED3\u6784\u8868",
      "\u6295\u8D44\u610F\u5411\u4E66\u6216 TS \u8349\u7A3F",
      "\u516C\u53F8\u7AE0\u7A0B\u73B0\u884C\u7248\u672C"
    ],
    "\u80A1\u6743\u67B6\u6784\u8BBE\u8BA1": [
      "\u5408\u4F19\u4EBA\u51FA\u8D44\u4E0E\u5206\u5DE5\u8BF4\u660E",
      "\u73B0\u6709\u80A1\u6743\u6BD4\u4F8B",
      "\u662F\u5426\u5DF2\u8BBE\u671F\u6743\u6C60"
    ],
    "\u5408\u540C\u5BA1\u67E5": [
      "\u5F85\u5BA1\u5408\u540C\u7535\u5B50\u7248",
      "\u5408\u540C\u80CC\u666F\u4E0E\u5173\u6CE8\u70B9\u8BF4\u660E"
    ],
    "\u80A1\u6743\u6FC0\u52B1": [
      "\u73B0\u6709\u80A1\u6743\u7ED3\u6784\u8868",
      "\u62DF\u6FC0\u52B1\u4EBA\u5458\u8303\u56F4"
    ],
    "\u77E5\u8BC6\u4EA7\u6743\u4FDD\u62A4": [
      "\u6743\u5229\u8BC1\u660E\u6587\u4EF6",
      "\u4FB5\u6743\u7EBF\u7D22\u6216\u4F7F\u7528\u8BC1\u636E"
    ],
    "\u52B3\u52A8\u5408\u89C4": [
      "\u73B0\u884C\u52B3\u52A8\u5408\u540C\u6A21\u677F",
      "\u5458\u5DE5\u624B\u518C\u6216\u89C4\u7AE0\u5236\u5EA6"
    ],
    "\u5546\u6807\u6CE8\u518C": [
      "\u8425\u4E1A\u6267\u7167\u526F\u672C\u626B\u63CF\u4EF6",
      "\u5546\u6807\u56FE\u6837\u6587\u4EF6",
      "\u62DF\u6CE8\u518C\u7C7B\u522B\u6E05\u5355"
    ],
    "\u4E13\u5229\u7533\u8BF7": [
      "\u6280\u672F\u4EA4\u5E95\u4E66",
      "\u73B0\u6709\u516C\u5F00\u8D44\u6599\u6E05\u5355"
    ],
    "\u8457\u4F5C\u6743\u767B\u8BB0": [
      "\u4F5C\u54C1\u6837\u672C",
      "\u521B\u4F5C\u5B8C\u6210\u65F6\u95F4\u8BC1\u660E"
    ],
    "\u516C\u53F8\u6CE8\u518C": [
      "\u62DF\u7528\u516C\u53F8\u540D\u79F0 3-5 \u4E2A",
      "\u6CE8\u518C\u5730\u5740\u8BC1\u660E",
      "\u80A1\u4E1C\u8EAB\u4EFD\u4FE1\u606F"
    ],
    "\u5DE5\u5546\u53D8\u66F4": [
      "\u73B0\u884C\u8425\u4E1A\u6267\u7167",
      "\u62DF\u53D8\u66F4\u4E8B\u9879\u8BF4\u660E"
    ],
    "default": [
      "\u516C\u53F8\u57FA\u672C\u4FE1\u606F",
      "\u4E0E\u672C\u6B21\u9700\u6C42\u76F8\u5173\u7684\u73B0\u6709\u6750\u6599"
    ]
  };
  var rejectReasonPool = {
    "scope": "\u8BE5\u9700\u6C42\u4E0D\u5728\u672C\u56E2\u961F\u5F53\u524D\u627F\u63A5\u8303\u56F4\u5185\uFF0C\u5EFA\u8BAE\u9009\u62E9\u66F4\u5BF9\u53E3\u7684\u56E2\u961F\u3002",
    "busy": "\u5F53\u524D\u6392\u671F\u5DF2\u6EE1\uFF0C\u6682\u65F6\u65E0\u6CD5\u627F\u63A5\uFF0C\u5EFA\u8BAE\u4E00\u5468\u540E\u518D\u53D1\u8D77\u3002",
    "budget": "\u6309\u4F60\u7684\u9884\u7B97\u8303\u56F4\u6211\u4EEC\u6682\u65F6\u65E0\u6CD5\u4FDD\u8BC1\u4EA4\u4ED8\u8D28\u91CF\uFF0C\u5EFA\u8BAE\u9002\u5F53\u4E0A\u8C03\u6216\u7F29\u5C0F\u670D\u52A1\u8303\u56F4\u3002",
    "vague": "\u9700\u6C42\u4FE1\u606F\u4E0D\u8DB3\uFF08\u670D\u52A1\u7C7B\u578B / \u5173\u952E\u4FE1\u606F\u672A\u586B\u5199\uFF09\uFF0C\u65E0\u6CD5\u5224\u65AD\u662F\u5426\u80FD\u627F\u63A5\uFF0C\u5EFA\u8BAE\u8865\u5145\u540E\u91CD\u65B0\u63D0\u4EA4\u3002"
  };

  // src/data/teams.js
  var teams = [
    {
      "id": "t001",
      "name": "\u660E\u6CD5\u5F8B\u5E08\u56E2\u961F",
      "orgShort": "\u9526\u5929\u5F8B\u6240",
      "orgId": "org001",
      "avatar": "\u660E",
      "avatarColor": "#5B5BD6",
      "heroImage": "",
      "badge": "gold",
      "rating": 4.9,
      "reviewCount": 28,
      "tags": [
        "verified",
        "fast",
        "active"
      ],
      "priceText": "\xA5800\u8D77",
      "priceMode": "\u6309\u9879\u76EE\u62A5\u4EF7",
      "city": "\u5317\u4EAC",
      "district": "\u671D\u9633\u533A",
      "avgResponse": "2\u5C0F\u65F6",
      "skus": [
        "\u80A1\u6743\u67B6\u6784\u8BBE\u8BA1",
        "\u878D\u8D44\u4EA4\u6613",
        "\u5408\u540C\u5BA1\u67E5",
        "\u80A1\u6743\u6FC0\u52B1"
      ],
      "desc": "\u4E13\u6CE8TMT\u9886\u57DF\u6CD5\u5F8B\u670D\u52A110\u5E74\uFF0C\u7D2F\u8BA1\u534F\u52A950+\u5BB6\u4F01\u4E1A\u5B8C\u6210\u878D\u8D44\uFF0C\u80A1\u6743\u67B6\u6784\u8BBE\u8BA1\u7ECF\u9A8C\u4E30\u5BCC\uFF0C\u6DF1\u8C19\u521D\u521B\u4F01\u4E1A\u6CD5\u5F8B\u75DB\u70B9\u3002",
      "volume": 36,
      "years": 10,
      "completedOrders": 36,
      "totalClients": 120,
      "certifiedCount": 5,
      "members": [
        {
          "name": "\u674E\u660E",
          "role": "\u8D1F\u8D23\u4EBA\xB7\u5408\u4F19\u4EBA",
          "avatar": "\u674E",
          "desc": "\u5317\u4EAC\u5927\u5B66\u6CD5\u5B66\u7855\u58EB\uFF0C\u4E13\u6CE8TMT\u9886\u57DF10\u5E74"
        },
        {
          "name": "\u738B\u82B3",
          "role": "\u8D44\u6DF1\u5F8B\u5E08",
          "avatar": "\u738B",
          "desc": "\u4E2D\u56FD\u653F\u6CD5\u5927\u5B66\u6CD5\u5B66\u535A\u58EB\uFF0C\u878D\u8D44\u4EA4\u6613\u4E13\u5BB6"
        },
        {
          "name": "\u9648\u6770",
          "role": "\u6267\u4E1A\u5F8B\u5E08",
          "avatar": "\u9648",
          "desc": "\u6E05\u534E\u5927\u5B66\u6CD5\u5B66\u7855\u58EB\uFF0C\u77E5\u8BC6\u4EA7\u6743\u65B9\u5411"
        }
      ],
      "specialties": [
        "TMT\u884C\u4E1A",
        "\u878D\u8D44\u4EA4\u6613",
        "\u80A1\u6743\u8BBE\u8BA1"
      ],
      "verifyItems": [
        {
          "type": "strong",
          "label": "\u5F8B\u5E08\u6267\u4E1A\u8BC1 \xB7 \u5DF2\u6838\u9A8C",
          "status": "verified"
        },
        {
          "type": "strong",
          "label": "\u5F8B\u6240\u6267\u4E1A\u8BB8\u53EF\u8BC1 \xB7 \u5DF2\u6838\u9A8C",
          "status": "verified"
        },
        {
          "type": "public",
          "label": "\u6559\u80B2\u80CC\u666F \xB7 \u516C\u5F00\u53EF\u67E5",
          "status": "public"
        },
        {
          "type": "screened",
          "label": "\u65E0\u4E0D\u826F\u6267\u4E1A\u8BB0\u5F55 \xB7 \u7B5B\u67E5\u5DF2\u901A\u8FC7",
          "status": "screened"
        }
      ],
      "awards": [
        {
          "year": "2024",
          "title": "\u884C\u4E1A\u6743\u5A01\u699C\u5355 \xB7 TMT\u6CD5\u5F8B\u670D\u52A1\u63A8\u8350"
        },
        {
          "year": "2023",
          "title": "\u5E73\u53F0\u5E74\u5EA6\u4F18\u8D28\u670D\u52A1\u56E2\u961F"
        }
      ],
      "qa": [
        {
          "q": "\u56E2\u961F\u4E3B\u8981\u670D\u52A1\u54EA\u4E9B\u884C\u4E1A\uFF1F",
          "a": "\u6211\u4EEC\u4E13\u6CE8TMT\u9886\u57DF\uFF0C\u670D\u52A1\u8FC750+\u5BB6\u4E92\u8054\u7F51\u548C\u79D1\u6280\u4F01\u4E1A\uFF0C\u5BF9\u521D\u521B\u4F01\u4E1A\u7684\u6CD5\u5F8B\u9700\u6C42\u6709\u6DF1\u5165\u7406\u89E3\u3002",
          "tag": "\u670D\u52A1\u5546\u56DE\u7B54"
        },
        {
          "q": "\u80A1\u6743\u67B6\u6784\u8BBE\u8BA1\u7684\u6D41\u7A0B\u662F\u600E\u6837\u7684\uFF1F",
          "a": "\u4E00\u822C\u5305\u62EC\u9700\u6C42\u4E86\u89E3\u3001\u65B9\u6848\u8BBE\u8BA1\u3001\u6587\u4EF6\u8D77\u8349\u548C\u7B7E\u7F72\u843D\u5730\uFF0C\u901A\u5E382-3\u5468\u5B8C\u6210\u3002",
          "tag": "\u670D\u52A1\u5546\u56DE\u7B54"
        },
        {
          "q": "\u53EF\u4EE5\u63D0\u4F9B\u4E0A\u95E8\u670D\u52A1\u5417\uFF1F",
          "a": "\u5317\u4EAC\u5730\u533A\u53EF\u63D0\u4F9B\u4E0A\u95E8\u6C9F\u901A\uFF0C\u5916\u5730\u5BA2\u6237\u901A\u8FC7\u7EBF\u4E0A\u4F1A\u8BAE\u8FDB\u884C\u3002",
          "tag": "\u670D\u52A1\u5546\u56DE\u7B54"
        }
      ],
      "reviews": [
        {
          "user": "\u5F20***",
          "rating": 5,
          "text": "\u975E\u5E38\u4E13\u4E1A\uFF0C\u5E2E\u6211\u4EEC\u7406\u6E05\u4E86\u80A1\u6743\u67B6\u6784\uFF0C\u6C9F\u901A\u4E5F\u5F88\u987A\u7545\u3002",
          "date": "2024-12-15"
        },
        {
          "user": "\u674E***",
          "rating": 5,
          "text": "\u878D\u8D44\u8FC7\u7A0B\u4E2D\u7684\u6CD5\u5F8B\u95EE\u9898\u5904\u7406\u5F97\u5F88\u597D\uFF0C\u54CD\u5E94\u901F\u5EA6\u5FEB\u3002",
          "date": "2024-11-20"
        },
        {
          "user": "\u738B***",
          "rating": 4,
          "text": "\u6574\u4F53\u6EE1\u610F\uFF0C\u5C31\u662F\u6392\u671F\u7A0D\u5FAE\u957F\u4E86\u4E00\u70B9\u3002",
          "date": "2024-10-08"
        }
      ],
      "aiSummary": "\u8FD1\u671F\u5BA2\u6237\u8F83\u8BA4\u53EF\u56E2\u961F\u7684\u4E13\u4E1A\u80FD\u529B\u548C\u54CD\u5E94\u901F\u5EA6\uFF0C\u878D\u8D44\u4EA4\u6613\u548C\u80A1\u6743\u8BBE\u8BA1\u662F\u4E3B\u8981\u597D\u8BC4\u65B9\u5411\uFF1B\u5C11\u91CF\u5BA2\u6237\u63D0\u5230\u6392\u671F\u8F83\u957F\u3002",
      "cases": [
        {
          "dir": "\u878D\u8D44\u4EA4\u6613",
          "items": [
            "\u67D0AIGC\u516C\u53F8Pre-A\u8F6E\u878D\u8D44\u6CD5\u5F8B\u987E\u95EE",
            "\u67D0SaaS\u4F01\u4E1A\u5929\u4F7F\u8F6E\u4EA4\u6613\u67B6\u6784\u8BBE\u8BA1",
            "\u67D0\u667A\u80FD\u786C\u4EF6\u516C\u53F8A\u8F6E\u878D\u8D44\u5168\u7A0B\u6CD5\u5F8B\u670D\u52A1"
          ]
        },
        {
          "dir": "\u80A1\u6743\u67B6\u6784",
          "items": [
            "\u67D0\u79D1\u6280\u521D\u521B\u516C\u53F8\u5408\u4F19\u4EBA\u80A1\u6743\u5206\u914D\u65B9\u6848",
            "\u67D0\u4E92\u8054\u7F51\u516C\u53F8\u671F\u6743\u6C60\u8BBE\u8BA1\u4E0E\u843D\u5730"
          ]
        }
      ],
      "orgName": "\u5317\u4EAC\u9526\u5929\u5F8B\u5E08\u4E8B\u52A1\u6240",
      "priceSummary": "\xA5800\u8D77 \xB7 \u6309\u9879\u76EE\u62A5\u4EF7"
    },
    {
      "id": "t002",
      "name": "\u6B63\u5927\u6CD5\u52A1\u56E2\u961F",
      "orgShort": "\u6B63\u5927\u6CD5\u52A1",
      "orgId": "org002",
      "avatar": "\u6B63",
      "avatarColor": "#5B5BD6",
      "heroImage": "",
      "badge": "flagship",
      "rating": 4.8,
      "reviewCount": 15,
      "tags": [
        "verified",
        "good"
      ],
      "priceText": "\xA51200\u8D77",
      "priceMode": "\u6309\u9879\u76EE\u62A5\u4EF7",
      "city": "\u5317\u4EAC",
      "district": "\u6D77\u6DC0\u533A",
      "avgResponse": "4\u5C0F\u65F6",
      "skus": [
        "\u5408\u540C\u5BA1\u67E5",
        "\u52B3\u52A8\u5408\u89C4",
        "\u80A1\u6743\u67B6\u6784\u8BBE\u8BA1"
      ],
      "desc": "\u7EFC\u5408\u6027\u6CD5\u52A1\u56E2\u961F\uFF0C\u64C5\u957F\u4F01\u4E1A\u5408\u89C4\u4E0E\u52B3\u52A8\u6CD5\u5F8B\u4E8B\u52A1\uFF0C\u670D\u52A1\u8986\u76D6\u4F01\u4E1A\u5168\u751F\u547D\u5468\u671F\u3002",
      "volume": 22,
      "years": 8,
      "completedOrders": 22,
      "totalClients": 80,
      "certifiedCount": 4,
      "members": [
        {
          "name": "\u8D75\u6B63",
          "role": "\u8D1F\u8D23\u4EBA\xB7\u8D44\u6DF1\u5F8B\u5E08",
          "avatar": "\u8D75",
          "desc": "8\u5E74\u4F01\u4E1A\u6CD5\u52A1\u7ECF\u9A8C"
        },
        {
          "name": "\u5B59\u4E3D",
          "role": "\u6267\u4E1A\u5F8B\u5E08",
          "avatar": "\u5B59",
          "desc": "\u52B3\u52A8\u6CD5\u65B9\u5411\u4E13\u5BB6"
        }
      ],
      "specialties": [
        "\u4F01\u4E1A\u5408\u89C4",
        "\u52B3\u52A8\u6CD5"
      ],
      "verifyItems": [
        {
          "type": "strong",
          "label": "\u5F8B\u5E08\u6267\u4E1A\u8BC1 \xB7 \u5DF2\u6838\u9A8C",
          "status": "verified"
        },
        {
          "type": "public",
          "label": "\u6559\u80B2\u80CC\u666F \xB7 \u516C\u5F00\u53EF\u67E5",
          "status": "public"
        }
      ],
      "awards": [],
      "qa": [
        {
          "q": "\u52B3\u52A8\u5408\u89C4\u4E3B\u8981\u8986\u76D6\u54EA\u4E9B\u65B9\u9762\uFF1F",
          "a": "\u5305\u62EC\u52B3\u52A8\u5408\u540C\u7BA1\u7406\u3001\u793E\u4FDD\u5408\u89C4\u3001\u52B3\u52A8\u4E89\u8BAE\u5904\u7406\u7B49\u3002",
          "tag": "\u670D\u52A1\u5546\u56DE\u7B54"
        }
      ],
      "reviews": [
        {
          "user": "\u9648***",
          "rating": 5,
          "text": "\u5E2E\u6211\u4EEC\u68B3\u7406\u4E86\u52B3\u52A8\u5408\u540C\u6A21\u677F\uFF0C\u5F88\u7EC6\u81F4\u3002",
          "date": "2024-11-10"
        },
        {
          "user": "\u5218***",
          "rating": 4,
          "text": "\u4E13\u4E1A\u80FD\u529B\u4E0D\u9519\u3002",
          "date": "2024-09-15"
        }
      ],
      "aiSummary": "\u8FD1\u671F\u5BA2\u6237\u8F83\u8BA4\u53EF\u56E2\u961F\u7684\u7EC6\u81F4\u548C\u4E13\u4E1A\uFF0C\u52B3\u52A8\u5408\u89C4\u670D\u52A1\u53CD\u9988\u8F83\u597D\u3002",
      "cases": [
        {
          "dir": "\u52B3\u52A8\u5408\u89C4",
          "items": [
            "\u67D0\u4E92\u8054\u7F51\u516C\u53F8\u5168\u5458\u52B3\u52A8\u5408\u540C\u4F53\u7CFB\u642D\u5EFA",
            "\u67D0\u5236\u9020\u4F01\u4E1A\u52B3\u52A8\u4E89\u8BAE\u6279\u91CF\u5904\u7406"
          ]
        }
      ],
      "orgName": "\u5317\u4EAC\u6B63\u5927\u6CD5\u5F8B\u54A8\u8BE2\u6709\u9650\u516C\u53F8",
      "priceSummary": "\xA51200\u8D77 \xB7 \u6309\u9879\u76EE\u62A5\u4EF7"
    },
    {
      "id": "t003",
      "name": "\u667A\u6743\u77E5\u8BC6\u4EA7\u6743\u56E2\u961F",
      "orgShort": "\u667A\u6743IP",
      "orgId": "org003",
      "avatar": "\u667A",
      "avatarColor": "#5B5BD6",
      "heroImage": "",
      "badge": null,
      "rating": 4.7,
      "reviewCount": 8,
      "tags": [
        "verified",
        "new"
      ],
      "priceText": "\u8BC4\u4F30\u540E\u62A5\u4EF7",
      "priceMode": "\u652F\u6301\u5206\u9636\u6BB5\u4ED8\u6B3E",
      "city": "\u5317\u4EAC",
      "district": "\u897F\u57CE\u533A",
      "avgResponse": "6\u5C0F\u65F6",
      "skus": [
        "\u5546\u6807\u6CE8\u518C",
        "\u4E13\u5229\u7533\u8BF7",
        "\u8457\u4F5C\u6743\u767B\u8BB0"
      ],
      "desc": "\u4E13\u6CE8\u77E5\u8BC6\u4EA7\u6743\u7533\u8BF7\u4E0E\u4FDD\u62A4\uFF0C\u4E13\u5229\u4EE3\u7406\u5E08+\u5546\u6807\u4EE3\u7406\u4EBA\u53CC\u8D44\u8D28\uFF0C\u4E3A\u79D1\u6280\u4F01\u4E1A\u63D0\u4F9B\u4E00\u7AD9\u5F0FIP\u670D\u52A1\u3002",
      "volume": 0,
      "years": 6,
      "completedOrders": 0,
      "totalClients": 45,
      "certifiedCount": 3,
      "members": [
        {
          "name": "\u5468\u667A",
          "role": "\u8D1F\u8D23\u4EBA\xB7\u4E13\u5229\u4EE3\u7406\u5E08",
          "avatar": "\u5468",
          "desc": "6\u5E74\u77E5\u8BC6\u4EA7\u6743\u4ECE\u4E1A\u7ECF\u9A8C"
        }
      ],
      "specialties": [
        "\u4E13\u5229\u7533\u8BF7",
        "\u5546\u6807\u6CE8\u518C"
      ],
      "verifyItems": [
        {
          "type": "strong",
          "label": "\u4E13\u5229\u4EE3\u7406\u5E08\u8D44\u683C\u8BC1 \xB7 \u5DF2\u6838\u9A8C",
          "status": "verified"
        },
        {
          "type": "strong",
          "label": "\u5546\u6807\u4EE3\u7406\u8D44\u8D28 \xB7 \u5DF2\u6838\u9A8C",
          "status": "verified"
        }
      ],
      "awards": [],
      "qa": [
        {
          "q": "\u5546\u6807\u6CE8\u518C\u4E00\u822C\u591A\u4E45\u80FD\u4E0B\u6765\uFF1F",
          "a": "\u987A\u5229\u60C5\u51B5\u4E0B9-12\u4E2A\u6708\u62FF\u5230\u6CE8\u518C\u8BC1\uFF0C\u6211\u4EEC\u4F1A\u5728\u6BCF\u4E2A\u8282\u70B9\u53CA\u65F6\u901A\u77E5\u60A8\u3002",
          "tag": "\u670D\u52A1\u5546\u56DE\u7B54"
        }
      ],
      "reviews": [
        {
          "user": "\u9EC4***",
          "rating": 5,
          "text": "\u5546\u6807\u6CE8\u518C\u5F88\u987A\u5229\uFF0C\u6C9F\u901A\u53CA\u65F6\u3002",
          "date": "2024-12-01"
        }
      ],
      "aiSummary": "\u8FD1\u671F\u5BA2\u6237\u5BF9\u6C9F\u901A\u53CA\u65F6\u6027\u8BC4\u4EF7\u8F83\u9AD8\uFF0C\u4E13\u5229\u548C\u5546\u6807\u670D\u52A1\u662F\u8BE5\u56E2\u961F\u7684\u4E3B\u8981\u4F18\u52BF\u3002",
      "cases": [
        {
          "dir": "\u5546\u6807\u6CE8\u518C",
          "items": [
            "\u67D0\u79D1\u6280\u516C\u53F85\u4EF6\u5546\u6807\u540C\u6B65\u6CE8\u518C",
            "\u67D0\u9910\u996E\u54C1\u724C\u5168\u7C7B\u522B\u5546\u6807\u5E03\u5C40"
          ]
        }
      ],
      "orgName": "\u5317\u4EAC\u667A\u6743\u77E5\u8BC6\u4EA7\u6743\u4EE3\u7406\u6709\u9650\u516C\u53F8",
      "priceSummary": "\u6309\u9879\u76EE\u8BC4\u4F30 \xB7 \u652F\u6301\u5206\u9636\u6BB5\u4ED8\u6B3E"
    },
    {
      "id": "t004",
      "name": "\u5B89\u4FE1\u6CD5\u5F8B\u56E2\u961F",
      "orgShort": "\u5B89\u4FE1\u5F8B\u6240",
      "orgId": "org001",
      "avatar": "\u5B89",
      "avatarColor": "#5B5BD6",
      "heroImage": "",
      "badge": "gold",
      "rating": 4.9,
      "reviewCount": 42,
      "tags": [
        "verified",
        "fast",
        "active",
        "good"
      ],
      "priceText": "\xA51000\u8D77",
      "priceMode": "\u6309\u9879\u76EE\u62A5\u4EF7",
      "city": "\u4E0A\u6D77",
      "district": "\u6D66\u4E1C\u65B0\u533A",
      "avgResponse": "1\u5C0F\u65F6",
      "skus": [
        "\u878D\u8D44\u4EA4\u6613",
        "\u80A1\u6743\u67B6\u6784\u8BBE\u8BA1",
        "\u5408\u540C\u5BA1\u67E5",
        "\u77E5\u8BC6\u4EA7\u6743\u4FDD\u62A4"
      ],
      "desc": "\u6DF1\u8015\u8D44\u672C\u5E02\u573A\u6CD5\u5F8B\u670D\u52A115\u5E74\uFF0C\u53C2\u4E0E\u8D85\u8FC7100\u8D77\u878D\u8D44\u5E76\u8D2D\u9879\u76EE\uFF0C\u64C5\u957F\u590D\u6742\u4EA4\u6613\u7ED3\u6784\u8BBE\u8BA1\u3002",
      "volume": 58,
      "years": 15,
      "completedOrders": 58,
      "totalClients": 200,
      "certifiedCount": 8,
      "members": [
        {
          "name": "\u5434\u5B89",
          "role": "\u8D1F\u8D23\u4EBA\xB7\u9AD8\u7EA7\u5408\u4F19\u4EBA",
          "avatar": "\u5434",
          "desc": "15\u5E74\u8D44\u672C\u5E02\u573A\u6CD5\u5F8B\u670D\u52A1\u7ECF\u9A8C"
        },
        {
          "name": "\u90D1\u4FE1",
          "role": "\u5408\u4F19\u4EBA",
          "avatar": "\u90D1",
          "desc": "\u534E\u4E1C\u653F\u6CD5\u5927\u5B66\u6CD5\u5B66\u535A\u58EB"
        }
      ],
      "specialties": [
        "\u8D44\u672C\u5E02\u573A",
        "\u5E76\u8D2D\u91CD\u7EC4"
      ],
      "verifyItems": [
        {
          "type": "strong",
          "label": "\u5F8B\u5E08\u6267\u4E1A\u8BC1 \xB7 \u5DF2\u6838\u9A8C",
          "status": "verified"
        },
        {
          "type": "strong",
          "label": "\u5F8B\u6240\u6267\u4E1A\u8BB8\u53EF\u8BC1 \xB7 \u5DF2\u6838\u9A8C",
          "status": "verified"
        }
      ],
      "awards": [
        {
          "year": "2024",
          "title": "\u5E73\u53F0\u5E74\u5EA6\u4EA4\u6613\u670D\u52A1\u4F18\u9009"
        },
        {
          "year": "2022",
          "title": "\u884C\u4E1A\u6743\u5A01\u699C\u5355 \xB7 \u4EA4\u6613\u5F8B\u5E08\u63A8\u8350"
        }
      ],
      "qa": [
        {
          "q": "\u878D\u8D44\u4EA4\u6613\u7684\u6536\u8D39\u6807\u51C6\uFF1F",
          "a": "\u6839\u636E\u878D\u8D44\u89C4\u6A21\u548C\u590D\u6742\u7A0B\u5EA6\u5B9A\u4EF7\uFF0C\u79CD\u5B50\u8F6E\u4E00\u822C\u57281-3\u4E07\uFF0CA\u8F6E3-8\u4E07\u3002",
          "tag": "\u670D\u52A1\u5546\u56DE\u7B54"
        },
        {
          "q": "\u5F02\u5730\u5BA2\u6237\u5982\u4F55\u670D\u52A1\uFF1F",
          "a": "\u6211\u4EEC\u6709\u5B8C\u5584\u7684\u7EBF\u4E0A\u534F\u4F5C\u6D41\u7A0B\uFF0C\u5F02\u5730\u5BA2\u6237\u901A\u8FC7\u89C6\u9891\u4F1A\u8BAE\u548C\u5728\u7EBF\u6587\u6863\u8FDB\u884C\u3002",
          "tag": "\u670D\u52A1\u5546\u56DE\u7B54"
        }
      ],
      "reviews": [
        {
          "user": "\u8D75***",
          "rating": 5,
          "text": "A\u8F6E\u878D\u8D44\u5168\u7A0B\u628A\u5173\uFF0C\u975E\u5E38\u9760\u8C31\u3002",
          "date": "2024-12-20"
        },
        {
          "user": "\u94B1***",
          "rating": 5,
          "text": "\u4E13\u4E1A\u5EA6\u6781\u9AD8\uFF0C\u4EA4\u6613\u7ED3\u6784\u8BBE\u8BA1\u5F88\u5DE7\u5999\u3002",
          "date": "2024-11-15"
        },
        {
          "user": "\u5B59***",
          "rating": 5,
          "text": "\u54CD\u5E94\u901F\u5EA6\u4E00\u6D41\uFF0C\u51E0\u4E4E\u79D2\u56DE\u3002",
          "date": "2024-10-30"
        }
      ],
      "aiSummary": "\u8FD1\u671F\u5BA2\u6237\u8F83\u8BA4\u53EF\u56E2\u961F\u7684\u4E13\u4E1A\u5EA6\u3001\u53EF\u9760\u6027\u548C\u54CD\u5E94\u901F\u5EA6\uFF0C\u878D\u8D44\u4EA4\u6613\u670D\u52A1\u53CD\u9988\u8F83\u597D\u3002",
      "cases": [
        {
          "dir": "\u878D\u8D44\u4EA4\u6613",
          "items": [
            "\u67D0AI\u516C\u53F8B\u8F6E\u878D\u8D44\u6CD5\u5F8B\u987E\u95EE\uFF08\u4EA4\u6613\u989D2\u4EBF\uFF09",
            "\u67D0\u65B0\u80FD\u6E90\u4F01\u4E1AA+\u8F6E\u878D\u8D44",
            "\u67D0\u533B\u836F\u516C\u53F8C\u8F6E\u878D\u8D44\u5168\u7A0B\u670D\u52A1"
          ]
        },
        {
          "dir": "\u5E76\u8D2D\u91CD\u7EC4",
          "items": [
            "\u67D0\u79D1\u6280\u516C\u53F8\u6536\u8D2D\u6848\u6CD5\u5F8B\u5C3D\u8C03",
            "\u67D0\u6559\u80B2\u516C\u53F8\u8D44\u4EA7\u91CD\u7EC4"
          ]
        }
      ],
      "orgName": "\u5317\u4EAC\u9526\u5929\u5F8B\u5E08\u4E8B\u52A1\u6240",
      "priceSummary": "\xA51000\u8D77 \xB7 \u6309\u9879\u76EE\u62A5\u4EF7"
    },
    {
      "id": "t005",
      "name": "\u901F\u6377\u5DE5\u5546\u670D\u52A1",
      "orgShort": "\u901F\u6377",
      "orgId": "org004",
      "avatar": "\u901F",
      "avatarColor": "#5B5BD6",
      "heroImage": "",
      "badge": null,
      "rating": 4.6,
      "reviewCount": 5,
      "tags": [
        "verified",
        "fast"
      ],
      "priceText": "\xA5300\u8D77",
      "priceMode": "\u6309\u4EF6\u62A5\u4EF7",
      "city": "\u5317\u4EAC",
      "district": "\u671D\u9633\u533A",
      "avgResponse": "3\u5C0F\u65F6",
      "skus": [
        "\u516C\u53F8\u6CE8\u518C",
        "\u5DE5\u5546\u53D8\u66F4",
        "\u516C\u53F8\u6CE8\u9500"
      ],
      "desc": "\u4E13\u6CE8\u5DE5\u5546\u6CE8\u518C\u767B\u8BB0\u670D\u52A1\uFF0C3\u5929\u62FF\u7167\uFF0C\u5168\u7A0B\u7EBF\u4E0A\u529E\u7406\uFF0C\u63D0\u4F9B\u6CE8\u518C\u5730\u5740\u89E3\u51B3\u65B9\u6848\u3002",
      "volume": 120,
      "years": 5,
      "completedOrders": 120,
      "totalClients": 300,
      "certifiedCount": 2,
      "members": [
        {
          "name": "\u6797\u901F",
          "role": "\u8D1F\u8D23\u4EBA",
          "avatar": "\u6797",
          "desc": "5\u5E74\u5DE5\u5546\u670D\u52A1\u7ECF\u9A8C"
        }
      ],
      "specialties": [
        "\u5DE5\u5546\u6CE8\u518C"
      ],
      "verifyItems": [
        {
          "type": "strong",
          "label": "\u5DE5\u5546\u4EE3\u7406\u8D44\u8D28 \xB7 \u5DF2\u6838\u9A8C",
          "status": "verified"
        }
      ],
      "awards": [],
      "qa": [
        {
          "q": "\u6CE8\u518C\u516C\u53F8\u9700\u8981\u591A\u4E45\uFF1F",
          "a": "\u8D44\u6599\u9F50\u5168\u7684\u60C5\u51B5\u4E0B3\u4E2A\u5DE5\u4F5C\u65E5\u51FA\u8425\u4E1A\u6267\u7167\u3002",
          "tag": "\u670D\u52A1\u5546\u56DE\u7B54"
        }
      ],
      "reviews": [
        {
          "user": "\u5468***",
          "rating": 5,
          "text": "\u6548\u7387\u5F88\u9AD8\uFF0C3\u5929\u5C31\u62FF\u5230\u4E86\u6267\u7167\u3002",
          "date": "2024-12-10"
        },
        {
          "user": "\u5434***",
          "rating": 4,
          "text": "\u529E\u7406\u901F\u5EA6\u4E0D\u9519\u3002",
          "date": "2024-11-05"
        }
      ],
      "aiSummary": "\u8FD1\u671F\u5BA2\u6237\u8F83\u8BA4\u53EF\u56E2\u961F\u7684\u529E\u7406\u6548\u7387\uFF0C\u5DE5\u5546\u6CE8\u518C\u7B49\u6807\u51C6\u5316\u670D\u52A1\u4F53\u9A8C\u8F83\u7A33\u5B9A\u3002",
      "cases": [
        {
          "dir": "\u5DE5\u5546\u6CE8\u518C",
          "items": [
            "\u67D0\u79D1\u6280\u516C\u53F8\u6CE8\u518C\uFF083\u5929\u51FA\u7167\uFF09",
            "\u67D0\u6587\u5316\u516C\u53F8\u6CE8\u518C+\u5546\u6807\u540C\u6B65\u7533\u8BF7"
          ]
        }
      ],
      "orgName": "\u5317\u4EAC\u901F\u6377\u4F01\u4E1A\u670D\u52A1\u6709\u9650\u516C\u53F8",
      "priceSummary": "\xA5300\u8D77 \xB7 \u6309\u4EF6\u62A5\u4EF7"
    },
    {
      "id": "t006",
      "name": "\u534E\u4FE1\u77E5\u4EA7\u56E2\u961F",
      "orgShort": "\u534E\u4FE1",
      "orgId": "org003",
      "avatar": "\u534E",
      "avatarColor": "#5B5BD6",
      "heroImage": "",
      "badge": null,
      "rating": 4.5,
      "reviewCount": 3,
      "tags": [
        "verified"
      ],
      "priceText": "\u8BC4\u4F30\u540E\u62A5\u4EF7",
      "priceMode": "\u652F\u6301\u5206\u9636\u6BB5\u4ED8\u6B3E",
      "city": "\u5317\u4EAC",
      "district": "\u6D77\u6DC0\u533A",
      "avgResponse": "",
      "skus": [
        "\u4E13\u5229\u7533\u8BF7",
        "\u5546\u6807\u9A73\u56DE\u590D\u5BA1",
        "\u4E13\u5229\u4FB5\u6743\u5206\u6790"
      ],
      "desc": "\u524D\u56FD\u77E5\u5C40\u5BA1\u67E5\u5458\u9886\u8854\uFF0C\u64C5\u957F\u4E13\u5229\u7533\u8BF7\u4E0E\u9A73\u56DE\u590D\u5BA1\uFF0C\u6280\u672F\u80CC\u666F\u6DF1\u539A\u3002",
      "volume": 0,
      "years": 7,
      "completedOrders": 0,
      "totalClients": 30,
      "certifiedCount": 2,
      "members": [
        {
          "name": "\u6768\u534E",
          "role": "\u8D1F\u8D23\u4EBA\xB7\u524D\u5BA1\u67E5\u5458",
          "avatar": "\u6768",
          "desc": "\u524D\u56FD\u77E5\u5C40\u4E13\u5229\u5BA1\u67E5\u5458\uFF0C7\u5E74\u4ECE\u4E1A\u7ECF\u9A8C"
        }
      ],
      "specialties": [
        "\u4E13\u5229\u7533\u8BF7",
        "\u9A73\u56DE\u590D\u5BA1"
      ],
      "verifyItems": [
        {
          "type": "strong",
          "label": "\u4E13\u5229\u4EE3\u7406\u5E08\u8D44\u683C\u8BC1 \xB7 \u5DF2\u6838\u9A8C",
          "status": "verified"
        }
      ],
      "awards": [],
      "qa": [],
      "reviews": [],
      "aiSummary": "",
      "cases": [
        {
          "dir": "\u4E13\u5229\u7533\u8BF7",
          "items": [
            "\u67D0AI\u516C\u53F8\u7B97\u6CD5\u4E13\u5229\u7533\u8BF7\uFF08\u5DF2\u6388\u6743\uFF09"
          ]
        }
      ],
      "orgName": "\u5317\u4EAC\u667A\u6743\u77E5\u8BC6\u4EA7\u6743\u4EE3\u7406\u6709\u9650\u516C\u53F8",
      "priceSummary": "\u6309\u9879\u76EE\u8BC4\u4F30 \xB7 \u652F\u6301\u5206\u9636\u6BB5\u4ED8\u6B3E"
    },
    {
      "id": "t007",
      "name": "\u6CFD\u8861\u8D44\u672C\u56E2\u961F",
      "orgShort": "\u6CFD\u8861\u5F8B\u6240",
      "orgId": "org005",
      "avatar": "\u6CFD",
      "avatarColor": "#5B5BD6",
      "heroImage": "",
      "badge": "gold",
      "rating": 4.8,
      "reviewCount": 19,
      "tags": [
        "verified",
        "fast",
        "good"
      ],
      "priceText": "\xA51500\u8D77",
      "priceMode": "\u6309\u9879\u76EE\u62A5\u4EF7",
      "city": "\u5317\u4EAC",
      "district": "\u4E1C\u57CE\u533A",
      "avgResponse": "2\u5C0F\u65F6",
      "skus": [
        "\u878D\u8D44\u4EA4\u6613",
        "\u80A1\u6743\u67B6\u6784\u8BBE\u8BA1",
        "\u80A1\u6743\u6FC0\u52B1"
      ],
      "desc": "\u4E13\u6CE8\u521D\u521B\u4F01\u4E1A\u878D\u8D44\u6CD5\u5F8B\u670D\u52A1\uFF0C\u4ECE\u5929\u4F7F\u8F6E\u5230B\u8F6E\u5168\u5468\u671F\u8986\u76D6\uFF0C\u64C5\u957F\u6295\u8D44\u6761\u6B3E\u8C08\u5224\u3002",
      "volume": 45,
      "years": 12,
      "completedOrders": 45,
      "totalClients": 95,
      "certifiedCount": 6,
      "members": [
        {
          "name": "\u5218\u6CFD",
          "role": "\u8D1F\u8D23\u4EBA\xB7\u5408\u4F19\u4EBA",
          "avatar": "\u5218",
          "desc": "12\u5E74\u6295\u878D\u8D44\u6CD5\u5F8B\u670D\u52A1\u7ECF\u9A8C"
        }
      ],
      "specialties": [
        "\u6295\u878D\u8D44",
        "\u80A1\u6743\u8BBE\u8BA1"
      ],
      "verifyItems": [
        {
          "type": "strong",
          "label": "\u5F8B\u5E08\u6267\u4E1A\u8BC1 \xB7 \u5DF2\u6838\u9A8C",
          "status": "verified"
        },
        {
          "type": "strong",
          "label": "\u5F8B\u6240\u6267\u4E1A\u8BB8\u53EF\u8BC1 \xB7 \u5DF2\u6838\u9A8C",
          "status": "verified"
        }
      ],
      "awards": [
        {
          "year": "2024",
          "title": "\u5E73\u53F0\u5E74\u5EA6\u65B0\u9510\u670D\u52A1\u56E2\u961F"
        }
      ],
      "qa": [
        {
          "q": "\u662F\u5426\u63A5\u53D7\u5F02\u5730\u5BA2\u6237\uFF1F",
          "a": "\u63A5\u53D7\uFF0C\u7EBF\u4E0A\u4F1A\u8BAE+\u90AE\u5BC4\u7B7E\u7F72\u5373\u53EF\u5B8C\u6210\u591A\u6570\u670D\u52A1\u3002",
          "tag": "\u670D\u52A1\u5546\u56DE\u7B54"
        }
      ],
      "reviews": [
        {
          "user": "\u90D1***",
          "rating": 5,
          "text": "\u6761\u6B3E\u8BB2\u5F97\u5F88\u6E05\u695A\uFF0C\u5E2E\u6211\u4EEC\u907F\u4E86\u4E0D\u5C11\u5751\u3002",
          "date": "2024-12-05"
        }
      ],
      "aiSummary": "\u8FD1\u671F\u5BA2\u6237\u8F83\u8BA4\u53EF\u56E2\u961F\u7684\u4E13\u4E1A\u5EA6\u548C\u6C9F\u901A\u6E05\u6670\u5EA6\uFF0C\u6295\u8D44\u6761\u6B3E\u8C08\u5224\u53CD\u9988\u8F83\u597D\u3002",
      "cases": [
        {
          "dir": "\u878D\u8D44\u4EA4\u6613",
          "items": [
            "\u67D0SaaS\u4F01\u4E1A\u5929\u4F7F\u8F6E\u878D\u8D44",
            "\u67D0\u6D88\u8D39\u54C1\u516C\u53F8Pre-A\u8F6E\u6CD5\u5F8B\u987E\u95EE"
          ]
        }
      ],
      "orgName": "\u5317\u4EAC\u6CFD\u8861\u5F8B\u5E08\u4E8B\u52A1\u6240",
      "priceSummary": "\xA51500\u8D77 \xB7 \u6309\u9879\u76EE\u62A5\u4EF7"
    },
    {
      "id": "t008",
      "name": "\u660E\u5FB7\u5546\u6807\u56E2\u961F",
      "orgShort": "\u660E\u5FB7IP",
      "orgId": "org006",
      "avatar": "\u660E",
      "avatarColor": "#5B5BD6",
      "heroImage": "",
      "badge": null,
      "rating": 4.6,
      "reviewCount": 11,
      "tags": [
        "verified",
        "good"
      ],
      "priceText": "\u8BC4\u4F30\u540E\u62A5\u4EF7",
      "priceMode": "\u652F\u6301\u5206\u9636\u6BB5\u4ED8\u6B3E",
      "city": "\u5317\u4EAC",
      "district": "\u4E30\u53F0\u533A",
      "avgResponse": "4\u5C0F\u65F6",
      "skus": [
        "\u5546\u6807\u6CE8\u518C",
        "\u5546\u6807\u9A73\u56DE\u590D\u5BA1",
        "\u8457\u4F5C\u6743\u767B\u8BB0"
      ],
      "desc": "\u4E13\u6CE8\u54C1\u724C\u77E5\u8BC6\u4EA7\u6743\u4FDD\u62A4\uFF0C\u64C5\u957F\u5546\u6807\u5E03\u5C40\u4E0E\u9A73\u56DE\u590D\u5BA1\uFF0C\u5DF2\u4E3A200+\u54C1\u724C\u63D0\u4F9B\u670D\u52A1\u3002",
      "volume": 80,
      "years": 9,
      "completedOrders": 80,
      "totalClients": 200,
      "certifiedCount": 3,
      "members": [
        {
          "name": "\u5468\u5FB7",
          "role": "\u8D1F\u8D23\u4EBA\xB7\u5546\u6807\u4EE3\u7406\u4EBA",
          "avatar": "\u5468",
          "desc": "9\u5E74\u5546\u6807\u4EE3\u7406\u7ECF\u9A8C"
        }
      ],
      "specialties": [
        "\u5546\u6807\u5E03\u5C40",
        "\u9A73\u56DE\u590D\u5BA1"
      ],
      "verifyItems": [
        {
          "type": "strong",
          "label": "\u5546\u6807\u4EE3\u7406\u8D44\u8D28 \xB7 \u5DF2\u6838\u9A8C",
          "status": "verified"
        }
      ],
      "awards": [],
      "qa": [
        {
          "q": "\u5546\u6807\u9A73\u56DE\u540E\u591A\u4E45\u53EF\u4EE5\u590D\u5BA1\uFF1F",
          "a": "\u6536\u5230\u9A73\u56DE\u901A\u77E5\u4E66\u540E15\u65E5\u5185\u53EF\u63D0\u4EA4\u590D\u5BA1\u7533\u8BF7\u3002",
          "tag": "\u670D\u52A1\u5546\u56DE\u7B54"
        }
      ],
      "reviews": [
        {
          "user": "\u51AF***",
          "rating": 5,
          "text": "\u590D\u5BA1\u601D\u8DEF\u6E05\u6670\uFF0C\u6700\u7EC8\u6210\u529F\u4E0B\u8BC1\u3002",
          "date": "2024-11-28"
        }
      ],
      "aiSummary": "\u8FD1\u671F\u5BA2\u6237\u8F83\u8BA4\u53EF\u56E2\u961F\u7684\u4E13\u4E1A\u5EA6\uFF0C\u5546\u6807\u9A73\u56DE\u590D\u5BA1\u670D\u52A1\u53CD\u9988\u8F83\u597D\u3002",
      "cases": [
        {
          "dir": "\u5546\u6807\u9A73\u56DE\u590D\u5BA1",
          "items": [
            "\u67D0\u65B0\u6D88\u8D39\u54C1\u724C\u5546\u6807\u590D\u5BA1\u6210\u529F",
            "\u67D0\u79D1\u6280\u516C\u53F8\u6838\u5FC3\u5546\u6807\u5F02\u8BAE\u7B54\u8FA9"
          ]
        }
      ],
      "orgName": "\u5317\u4EAC\u660E\u5FB7\u77E5\u8BC6\u4EA7\u6743\u4EE3\u7406\u6709\u9650\u516C\u53F8",
      "priceSummary": "\u6309\u9879\u76EE\u8BC4\u4F30 \xB7 \u652F\u6301\u5206\u9636\u6BB5\u4ED8\u6B3E"
    },
    {
      "id": "t009",
      "name": "\u542F\u7B56\u653F\u7B56\u7533\u62A5\u56E2\u961F",
      "orgShort": "\u542F\u7B56\u54A8\u8BE2",
      "orgId": "org007",
      "avatar": "\u542F",
      "avatarColor": "#28786C",
      "heroImage": "",
      "badge": "gold",
      "rating": 4.8,
      "reviewCount": 12,
      "tags": ["verified", "good"],
      "priceText": "\u8BC4\u4F30\u540E\u62A5\u4EF7",
      "priceMode": "\u652F\u6301\u5206\u9636\u6BB5\u4ED8\u6B3E",
      "city": "\u5317\u4EAC",
      "district": "\u6D77\u6DC0\u533A",
      "avgResponse": "4\u5C0F\u65F6",
      "skus": ["\u9AD8\u65B0\u6280\u672F\u4F01\u4E1A\u8BA4\u5B9A", "\u4E13\u7CBE\u7279\u65B0\u7533\u62A5", "\u79D1\u6280\u9879\u76EE\u7533\u62A5"],
      "desc": "\u9762\u5411\u79D1\u6280\u4F01\u4E1A\u63D0\u4F9B\u8D44\u8D28\u8BC4\u4F30\u3001\u6750\u6599\u89C4\u5212\u4E0E\u7533\u62A5\u8DDF\u8FDB\u670D\u52A1\uFF0C\u5148\u8BC4\u4F30\u4F01\u4E1A\u6761\u4EF6\uFF0C\u518D\u786E\u8BA4\u670D\u52A1\u8303\u56F4\u548C\u4ED8\u6B3E\u8282\u70B9\u3002",
      "volume": 36,
      "years": 8,
      "completedOrders": 36,
      "totalClients": 78,
      "certifiedCount": 3,
      "members": [
        { "name": "\u6797\u542F", "role": "\u9879\u76EE\u8D1F\u8D23\u4EBA", "avatar": "\u6797", "desc": "8\u5E74\u79D1\u6280\u653F\u7B56\u9879\u76EE\u670D\u52A1\u7ECF\u9A8C" }
      ],
      "specialties": ["\u8D44\u683C\u8BC4\u4F30", "\u7533\u62A5\u6750\u6599\u89C4\u5212", "\u9879\u76EE\u8DDF\u8FDB"],
      "verifyItems": [
        { "type": "strong", "label": "\u4F01\u4E1A\u54A8\u8BE2\u670D\u52A1\u80FD\u529B \xB7 \u5DF2\u6838\u9A8C", "status": "verified" }
      ],
      "awards": [
        { "year": "2025", "title": "\u5E73\u53F0\u653F\u7B56\u670D\u52A1\u4F18\u9009\u56E2\u961F" }
      ],
      "qa": [
        { "q": "\u63D0\u4EA4\u7533\u62A5\u540E\u4E00\u5B9A\u80FD\u901A\u8FC7\u5417\uFF1F", "a": "\u7533\u62A5\u7ED3\u679C\u7531\u4E3B\u7BA1\u673A\u6784\u8BC4\u5BA1\u51B3\u5B9A\u3002\u56E2\u961F\u4F1A\u5728\u7B7E\u7EA6\u524D\u8BC4\u4F30\u6761\u4EF6\uFF0C\u5E76\u6309\u534F\u8BAE\u5B8C\u6210\u6750\u6599\u51C6\u5907\u4E0E\u7533\u62A5\u8DDF\u8FDB\uFF0C\u4F46\u4E0D\u627F\u8BFA\u6700\u7EC8\u83B7\u6279\u3002", "tag": "\u670D\u52A1\u5546\u56DE\u7B54" }
      ],
      "reviews": [
        { "user": "\u9B4F***", "rating": 5, "text": "\u524D\u671F\u8BC4\u4F30\u5F88\u7EC6\uFF0C\u6750\u6599\u6E05\u5355\u548C\u6BCF\u4E2A\u8282\u70B9\u90FD\u8BB2\u5F97\u6E05\u695A\u3002", "date": "2025-06-18" }
      ],
      "aiSummary": "\u5BA2\u6237\u8F83\u8BA4\u53EF\u56E2\u961F\u7684\u524D\u671F\u8BC4\u4F30\u5B8C\u6574\u5EA6\u3001\u6750\u6599\u89C4\u5212\u548C\u8FDB\u5EA6\u540C\u6B65\u3002",
      "cases": [
        { "dir": "\u9AD8\u65B0\u6280\u672F\u4F01\u4E1A\u8BA4\u5B9A", "items": ["\u67D0\u8F6F\u4EF6\u4F01\u4E1A\u9AD8\u4F01\u7533\u62A5\u6750\u6599\u89C4\u5212", "\u67D0\u5236\u9020\u4F01\u4E1A\u7814\u53D1\u8D44\u6599\u68B3\u7406"] }
      ],
      "orgName": "\u5317\u4EAC\u542F\u7B56\u4F01\u4E1A\u54A8\u8BE2\u6709\u9650\u516C\u53F8",
      "priceSummary": "\u6309\u9879\u76EE\u8BC4\u4F30 \xB7 \u652F\u6301\u5206\u9636\u6BB5\u4ED8\u6B3E"
    }
  ];

  // src/store.js
  var state = {
    demands,
    teams,
    chatMessages,
    serviceSuggestions
  };
  var listeners = /* @__PURE__ */ new Set();
  var store = {
    get demands() {
      return state.demands;
    },
    set demands(value) {
      setState("demands", value);
    },
    get teams() {
      return state.teams;
    },
    set teams(value) {
      setState("teams", value);
    },
    get chatMessages() {
      return state.chatMessages;
    },
    set chatMessages(value) {
      setState("chatMessages", value);
    },
    get serviceSuggestions() {
      return state.serviceSuggestions;
    },
    set serviceSuggestions(value) {
      setState("serviceSuggestions", value);
    }
  };
  function setState(key, value) {
    state[key] = value;
    emitChange({ type: "replace", key });
  }
  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
  function emitChange(change = { type: "update" }) {
    listeners.forEach((listener) => listener(change));
  }

  // src/ui/icons.js
  var iconPaths = {
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    "chevron-right": '<path d="m9 18 6-6-6-6"/>',
    "chevron-left": '<path d="m15 18-6-6 6-6"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    "check-circle": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    "x-circle": '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
    ban: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    "trending-up": '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    "star-outline": '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    "file-text": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    "map-pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
    "price-tag": '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
    building: '<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
    scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
    sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
    edit: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
    upload: '<path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/>',
    "eye-off": '<path d="m3 3 18 18"/><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.9 4.2A10.5 10.5 0 0 1 12 4c7 0 10 8 10 8a15.5 15.5 0 0 1-2.2 3.3"/><path d="M6.6 6.6C3.7 8.5 2 12 2 12s3 8 10 8a9.8 9.8 0 0 0 4.2-.9"/>',
    pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    play: '<path d="m7 4 13 8-13 8Z"/>'
  };
  var iconFilled = { star: true };
  function icon(name, size) {
    const iconSize = size || 16;
    const paths = this?.iconPaths || iconPaths;
    const filled = this?.iconFilled || iconFilled;
    const body = paths[name] || paths.help;
    const attributes = filled[name] ? 'fill="currentColor" stroke="none"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    return '<svg class="ic" width="' + iconSize + '" height="' + iconSize + '" viewBox="0 0 24 24" ' + attributes + ">" + body + "</svg>";
  }

  // src/ui/feedback.js
  function toast(message, duration) {
    const visibleDuration = duration || 2e3;
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();
    const element = document.createElement("div");
    element.className = "toast";
    element.textContent = message;
    document.querySelector(".phone-screen").appendChild(element);
    setTimeout(() => {
      element.remove();
    }, visibleDuration);
  }
  function showModal(options) {
    const overlay = document.createElement("div");
    overlay.className = "modal-center";
    overlay.innerHTML = '<div class="modal-dialog"><div class="modal-dialog-header"><div class="modal-dialog-title">' + (options.title || "\u63D0\u793A") + "</div></div>" + (options.body ? '<div class="modal-dialog-body">' + options.body + "</div>" : "") + '<div class="modal-dialog-actions"><button class="btn-cancel">' + (options.cancelText || "\u53D6\u6D88") + '</button><button class="' + (options.danger ? "btn-danger" : "btn-confirm") + '">' + (options.confirmText || "\u786E\u8BA4") + "</button></div></div>";
    document.querySelector(".phone-screen").appendChild(overlay);
    overlay.querySelector(".btn-cancel").addEventListener("click", () => {
      overlay.remove();
      if (options.onCancel) options.onCancel();
    });
    overlay.querySelector("." + (options.danger ? "btn-danger" : "btn-confirm")).addEventListener("click", () => {
      overlay.remove();
      if (options.onConfirm) options.onConfirm();
    });
  }
  function showSheet(options) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    let html = '<div class="modal-sheet">';
    html += '<div class="modal-sheet-handle"></div>';
    if (options.title) {
      html += '<div class="modal-sheet-header"><div class="modal-sheet-title">' + options.title + '</div><button class="modal-sheet-close">' + icon("x", 18) + "</button></div>";
    }
    html += '<div class="modal-sheet-body">' + (options.body || "") + "</div>";
    html += "</div>";
    overlay.innerHTML = html;
    document.querySelector(".phone-screen").appendChild(overlay);
    const close = () => {
      overlay.remove();
      if (options.onClose) options.onClose();
    };
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) close();
    });
    const closeButton = overlay.querySelector(".modal-sheet-close");
    if (closeButton) closeButton.addEventListener("click", close);
    return overlay;
  }
  function closeAllModals() {
    document.querySelectorAll(".modal-overlay, .modal-center, .p1-onboarding-overlay").forEach((element) => element.remove());
  }

  // src/components/wecomGuide.js
  var ui = {
    iconPaths,
    iconFilled,
    icon(name, size) {
      return icon.call(ui, name, size);
    }
  };
  function renderWecomCard() {
    if (isWecomAdded()) {
      return '<span class="p5-wecom-status-icon is-added">' + ui.icon("check-circle", 19) + '</span><span class="p5-wecom-copy"><strong>\u4F01\u4E1A\u5FAE\u4FE1\u901A\u77E5\u5DF2\u5F00\u542F</strong><small>\u56E2\u961F\u54CD\u5E94\u548C\u670D\u52A1\u8FDB\u5EA6\u4F1A\u53CA\u65F6\u901A\u77E5\u4F60</small></span>';
    }
    return '<span class="p5-wecom-status-icon">' + ui.icon("bell", 19) + '</span><span class="p5-wecom-copy"><strong>\u6DFB\u52A0\u4F01\u4E1A\u5FAE\u4FE1\u63A5\u6536\u901A\u77E5</strong><small>\u53CA\u65F6\u63A5\u6536\u56E2\u961F\u54CD\u5E94\u548C\u670D\u52A1\u8FDB\u5EA6</small></span>' + ui.icon("chevron-right", 17);
  }
  function openWecomGuide(source, onAdded) {
    const fundraisingConnection = source === "fundraisingConnection";
    const serviceConnection = source === "serviceConnection" || source === "afterConfirm";
    const connectionMode = fundraisingConnection || serviceConnection;
    if (isWecomAdded()) {
      if (typeof onAdded === "function") onAdded();
      toast(connectionMode ? "\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1\u5DF2\u6DFB\u52A0" : "\u4F01\u4E1A\u5FAE\u4FE1\u8FDB\u5EA6\u901A\u77E5\u5DF2\u5F00\u542F");
      return;
    }
    const beforePublish = source === "beforePublish";
    const title = fundraisingConnection ? "\u6DFB\u52A0\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1\uFF0C\u7531\u987E\u95EE\u534F\u52A9\u5EFA\u8054" : serviceConnection ? "\u6DFB\u52A0\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1\uFF0C\u7531\u987E\u95EE\u534F\u52A9\u62C9\u7FA4" : beforePublish ? "\u6DFB\u52A0\u4F01\u4E1A\u5FAE\u4FE1\uFF0C\u53D1\u5E03\u540E\u53CA\u65F6\u6536\u5230\u8FDB\u5C55" : "\u6DFB\u52A0\u4F01\u4E1A\u5FAE\u4FE1\uFF0C\u53CA\u65F6\u63A5\u6536\u56E2\u961F\u54CD\u5E94\u548C\u670D\u52A1\u8FDB\u5EA6";
    const description = fundraisingConnection ? "\u6DFB\u52A0\u540E\uFF0C\u5E73\u53F0\u987E\u95EE\u4F1A\u9080\u8BF7\u4F60\u548C\u5DF2\u786E\u8BA4\u7684\u6295\u8D44\u4EBA\u8FDB\u5165\u4F01\u4E1A\u5FAE\u4FE1\u7FA4\u3002\u540E\u7EED\u4EA4\u6D41\u5728\u4F01\u4E1A\u5FAE\u4FE1\u8FDB\u884C\u3002" : serviceConnection ? "\u6DFB\u52A0\u540E\uFF0C\u5E73\u53F0\u987E\u95EE\u4F1A\u9080\u8BF7\u4F60\u548C\u670D\u52A1\u56E2\u961F\u8FDB\u5165\u4F01\u4E1A\u5FAE\u4FE1\u7FA4\u3002\u9700\u6C42\u7EC6\u8282\u548C\u540E\u7EED\u534F\u4F5C\u5728\u4F01\u4E1A\u5FAE\u4FE1\u8FDB\u884C\u3002" : beforePublish ? "\u9700\u6C42\u53D1\u5E03\u540E\uFF0C\u56E2\u961F\u54CD\u5E94\u548C\u65B9\u6848\u8FDB\u5C55\u4F1A\u901A\u8FC7\u4F01\u4E1A\u5FAE\u4FE1\u53CA\u65F6\u901A\u77E5\u4F60\u3002" : "\u626B\u7801\u6DFB\u52A0\u540E\uFF0C\u91CD\u8981\u8FDB\u5C55\u4F1A\u901A\u8FC7\u4F01\u4E1A\u5FAE\u4FE1\u901A\u77E5\u4F60\u3002";
    const body = '<div class="p5-wecom-sheet"><h3>' + title + "</h3><p>" + description + '</p><div class="p5-demo-qr" aria-label="\u6F14\u793A\u4E8C\u7EF4\u7801"><span class="finder one"></span><span class="finder two"></span><span class="finder three"></span><span class="p5-qr-center">' + ui.icon("message", 21) + '</span></div><div class="p5-demo-label">\u6F14\u793A\u4E8C\u7EF4\u7801</div><button class="btn btn-primary btn-block" id="p5AddWecom">\u6211\u5DF2\u6DFB\u52A0</button><button class="btn btn-text btn-block" id="p5SkipWecom">\u7A0D\u540E\u6DFB\u52A0</button></div>';
    showSheet.call(ui, { title: "\u6DFB\u52A0\u4F01\u4E1A\u5FAE\u4FE1", body });
    document.getElementById("p5AddWecom").addEventListener("click", () => {
      addWecomConsultant();
      emitChange();
      closeAllModals();
      const card = document.getElementById("p5WecomCard");
      if (card) card.innerHTML = renderWecomCard();
      if (typeof onAdded === "function") onAdded();
      toast(connectionMode ? "\u5DF2\u6DFB\u52A0\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1" : "\u5DF2\u5F00\u542F\u4F01\u4E1A\u5FAE\u4FE1\u8FDB\u5EA6\u901A\u77E5");
    });
    document.getElementById("p5SkipWecom").addEventListener("click", closeAllModals);
  }

  // src/data/onboarding.js
  var ecologyOnboarding = {
    "version": "v1",
    "storageKey": "ecologyOnboardingSeen:v1",
    "imageUrl": "",
    "title": "\u4F01\u4E1A\u670D\u52A1\uFF0C\u4ECE\u9700\u6C42\u5F00\u59CB",
    "visualSubtitle": "\u8BF4\u6E05\u4F60\u7684\u60C5\u51B5\uFF0C\u5E73\u53F0\u5E2E\u4F60\u627E\u5230\u5408\u9002\u56E2\u961F",
    "serviceLabels": [
      "\u6CD5\u5F8B\u670D\u52A1",
      "\u5DE5\u5546\u670D\u52A1",
      "\u77E5\u8BC6\u4EA7\u6743"
    ],
    "description": "\u6CD5\u5F8B\u3001\u5DE5\u5546\u3001\u77E5\u8BC6\u4EA7\u6743\u7B49\u4E13\u4E1A\u56E2\u961F\uFF0C\u5E73\u53F0\u4F1A\u6839\u636E\u4F60\u7684\u60C5\u51B5\u63A8\u8350\u5408\u9002\u7684\u670D\u52A1\u56E2\u961F\u3002",
    "steps": [
      "\u63CF\u8FF0\u9700\u6C42",
      "\u5339\u914D\u56E2\u961F",
      "\u6C9F\u901A\u786E\u8BA4"
    ],
    "primaryText": "\u53D1\u5E03\u7B2C\u4E00\u6761\u9700\u6C42",
    "secondaryText": "\u5148\u901B\u901B"
  };

  // src/core/registry.js
  var pages = /* @__PURE__ */ new Map();
  function register(pageId, page14) {
    if (!pageId) throw new Error("pageId is required");
    if (!page14 || typeof page14.render !== "function") {
      throw new TypeError(`Page "${pageId}" must provide render(params)`);
    }
    pages.set(pageId, page14);
    return page14;
  }
  function get(pageId) {
    return pages.get(pageId);
  }

  // src/core/router.js
  var pageStack = [];
  var refreshablePages = ["p1", "p6", "p9", "p11", "p12", "p13"];
  var connectedHost = null;
  function connectRouter(host) {
    connectedHost = host;
  }
  function navigateTo(pageId, params) {
    if (!connectedHost) throw new Error("router host is not connected");
    return navigate.call(connectedHost, pageId, params);
  }
  function goBackToPrevious() {
    if (!connectedHost) throw new Error("router host is not connected");
    return goBack.call(connectedHost);
  }
  function replaceCurrentPage(pageId, params) {
    if (!connectedHost) throw new Error("router host is not connected");
    return replaceTop.call(connectedHost, pageId, params);
  }
  function switchToTab(tab) {
    if (!connectedHost) throw new Error("router host is not connected");
    return connectedHost.switchTab(tab);
  }
  function refreshActivePage() {
    if (!connectedHost) throw new Error("router host is not connected");
    return refreshCurrentPage.call(connectedHost);
  }
  function navigate(pageId, params) {
    this.pageStack.push({ pageId, params: params || {} });
    this.renderPage(pageId, params || {});
    this.showTabBar(false);
    this.scrollPageToTop();
  }
  function goBack() {
    this.pageStack.pop();
    if (this.pageStack.length === 0) {
      this.switchTab(this.currentTab);
    } else {
      const top = this.pageStack[this.pageStack.length - 1];
      this.renderPage(top.pageId, top.params);
      this.showTabBar(top.pageId === "p1");
      this.scrollPageToTop();
    }
  }
  function renderPage(pageId, params) {
    const page14 = get(pageId);
    if (page14 && typeof page14.render === "function") {
      const html = page14.render(params);
      const container = this.setPageContent(html, pageId);
      container.classList.add("page-enter");
      setTimeout(() => {
        container.classList.remove("page-enter");
      }, 300);
      if (typeof page14.init === "function") page14.init(params);
    } else {
      this.setPageContent(
        `<div class="empty-state"><div class="empty-icon">${this.icon("wrench", 48)}</div><div class="empty-title">\u9875\u9762\u5F00\u53D1\u4E2D</div><div class="empty-desc">\u9875\u9762 ${pageId} \u5373\u5C06\u4E0A\u7EBF</div></div>`,
        pageId
      );
    }
  }
  function replaceTop(pageId, params) {
    if (this.pageStack.length === 0) {
      this.pageStack.push({ pageId, params: params || {} });
    } else {
      this.pageStack[this.pageStack.length - 1] = { pageId, params: params || {} };
    }
  }
  function refreshCurrentPage() {
    this.updateBadge();
    const container = document.getElementById("page-container");
    if (!container) return;
    const pageId = container.getAttribute("data-page");
    if (pageId === "mine") {
      this.renderMine();
      return;
    }
    if (this.refreshablePages.indexOf(pageId) < 0) return;
    const top = this.pageStack[this.pageStack.length - 1];
    if (!top || top.pageId !== pageId) return;
    const outerScroll = container.scrollTop;
    const inner = document.getElementById("p6-tab-content") || document.getElementById("p9-list");
    const innerScroll = inner ? inner.scrollTop : 0;
    const page14 = get(pageId);
    if (page14 && typeof page14.onRefresh === "function") page14.onRefresh();
    this.renderPage(pageId, top.params);
    container.scrollTop = outerScroll;
    const refreshedInner = document.getElementById("p6-tab-content") || document.getElementById("p9-list");
    if (refreshedInner) refreshedInner.scrollTop = innerScroll;
  }

  // src/services/fundraisingState.js
  var fundraisingState = {
    status: "idle",
    bpName: "\u661F\u8FB0\u79D1\u6280\u5546\u4E1A\u8BA1\u5212\u4E66.pdf",
    bpUpdatedAt: "2026-08-28",
    project: {
      industry: "\u4F01\u4E1A\u670D\u52A1 / AI \u534F\u4F5C\u5DE5\u5177",
      region: "\u5317\u4EAC",
      stage: "Pre-A",
      round: "Pre-A \u8F6E",
      amount: "1500\u20132000 \u4E07\u5143",
      useOfFunds: "\u4EA7\u54C1\u7814\u53D1\u3001\u5E02\u573A\u62D3\u5C55\u3001\u6838\u5FC3\u56E2\u961F\u5EFA\u8BBE"
    },
    excluded: "",
    authorized: false,
    paused: false,
    submittedAt: "",
    investorBatch: 0,
    resultAvailableAt: "",
    resultNoticePending: false,
    connectionNoticeInvestorId: "",
    recommendedInvestorIds: [],
    connectionInvestorId: "",
    investorConnections: {}
  };
  function demoConnections() {
    return {
      i001: { status: "requested", initiator: "investor", requestedAt: "09-03 13:36" },
      i002: { status: "connecting", initiator: "entrepreneur", requestedAt: "09-03 12:10", confirmedAt: "09-03 12:28" },
      i003: { status: "connected", initiator: "investor", requestedAt: "09-02 16:20", confirmedAt: "09-02 17:05", groupCreatedAt: "09-03 09:18" },
      i004: { status: "withdrawn", requestedAt: "09-02 14:12", resolvedAt: "09-02 18:30" },
      i005: { status: "expired", requestedAt: "08-30 10:15", resolvedAt: "09-02 10:15" }
    };
  }
  function getFundraisingState() {
    return fundraisingState;
  }
  function updateFundraisingState(patch) {
    Object.assign(fundraisingState, patch || {});
    return fundraisingState;
  }
  function getInvestorConnection(investorId) {
    return fundraisingState.investorConnections[investorId] || null;
  }
  function updateInvestorConnection(investorId, patch) {
    const current = getInvestorConnection(investorId) || {};
    fundraisingState.investorConnections = {
      ...fundraisingState.investorConnections,
      [investorId]: { ...current, ...patch || {} }
    };
    return fundraisingState.investorConnections[investorId];
  }
  function getConnectionCounts() {
    const counts = { requested: 0, entrepreneur_requested: 0, confirmed: 0, connecting: 0, connected: 0, declined: 0, withdrawn: 0, expired: 0 };
    Object.values(fundraisingState.investorConnections).forEach((item) => {
      if (Object.prototype.hasOwnProperty.call(counts, item.status)) counts[item.status] += 1;
    });
    return counts;
  }
  function makeFundraisingResultsAvailable() {
    fundraisingState.status = "matched";
    fundraisingState.investorBatch = 0;
    fundraisingState.resultAvailableAt = "09-03 11:05";
    fundraisingState.resultNoticePending = true;
    fundraisingState.connectionNoticeInvestorId = "";
    fundraisingState.recommendedInvestorIds = ["i001", "i002", "i003", "i004", "i005"];
    fundraisingState.investorConnections = {};
    return fundraisingState;
  }
  function consumeFundraisingResultNotice() {
    fundraisingState.resultNoticePending = false;
    return fundraisingState;
  }
  function resetFundraisingState() {
    fundraisingState.status = "idle";
    fundraisingState.authorized = false;
    fundraisingState.paused = false;
    fundraisingState.submittedAt = "";
    fundraisingState.excluded = "";
    fundraisingState.investorBatch = 0;
    fundraisingState.resultAvailableAt = "";
    fundraisingState.resultNoticePending = false;
    fundraisingState.connectionNoticeInvestorId = "";
    fundraisingState.recommendedInvestorIds = [];
    fundraisingState.connectionInvestorId = "";
    fundraisingState.investorConnections = {};
  }
  function setFundraisingDemo(status) {
    fundraisingState.status = status;
    fundraisingState.authorized = status !== "idle";
    fundraisingState.paused = false;
    fundraisingState.submittedAt = status === "idle" ? "" : "09-03 10:20";
    fundraisingState.investorBatch = 0;
    fundraisingState.resultAvailableAt = status === "matched" ? "09-03 11:05" : "";
    fundraisingState.resultNoticePending = false;
    fundraisingState.connectionNoticeInvestorId = "";
    fundraisingState.recommendedInvestorIds = [];
    fundraisingState.connectionInvestorId = ["requested", "entrepreneur_requested", "confirmed", "connecting", "connected"].includes(status) ? "i001" : "";
    if (status === "matched") fundraisingState.investorConnections = demoConnections();
    else if (["requested", "entrepreneur_requested", "confirmed", "connecting", "connected", "declined", "withdrawn", "expired"].includes(status)) {
      fundraisingState.investorConnections = {
        i001: {
          status,
          initiator: status === "entrepreneur_requested" ? "entrepreneur" : "investor",
          requestedAt: "09-03 13:36",
          confirmedAt: ["confirmed", "connecting", "connected"].includes(status) ? "09-03 13:52" : "",
          resolvedAt: ["declined", "withdrawn", "expired"].includes(status) ? "09-03 14:10" : "",
          groupCreatedAt: status === "connected" ? "09-03 14:40" : ""
        }
      };
    } else fundraisingState.investorConnections = {};
  }
  function getFundraisingSummary() {
    const counts = getConnectionCounts();
    if (!fundraisingState.paused) {
      if (counts.requested) return { title: `${counts.requested} \u6761\u6295\u8D44\u4EBA\u5EFA\u8054\u7533\u8BF7\u5F85\u5904\u7406`, detail: "\u53EF\u5206\u522B\u540C\u610F\u6216\u6682\u4E0D\u5EFA\u8054", action: "\u53BB\u5904\u7406" };
      if (counts.entrepreneur_requested) return { title: `${counts.entrepreneur_requested} \u6761\u5BF9\u63A5\u7533\u8BF7\u5F85\u6295\u8D44\u4EBA\u786E\u8BA4`, detail: "\u786E\u8BA4\u7ED3\u679C\u4F1A\u901A\u8FC7\u5DF2\u5F00\u542F\u6E20\u9053\u901A\u77E5\u4F60", action: "\u67E5\u770B\u7533\u8BF7" };
      if (counts.confirmed) return { title: `${counts.confirmed} \u6761\u5EFA\u8054\u5F85\u7EE7\u7EED`, detail: "\u8BF7\u6DFB\u52A0\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1\uFF0C\u7531\u987E\u95EE\u534F\u52A9\u62C9\u7FA4", action: "\u7EE7\u7EED\u5EFA\u8054" };
      if (counts.connecting) return { title: `${counts.connecting} \u4F4D\u6295\u8D44\u4EBA\u5EFA\u8054\u4E2D`, detail: "\u5E73\u53F0\u987E\u95EE\u6B63\u5728\u521B\u5EFA\u4F01\u4E1A\u5FAE\u4FE1\u7FA4", action: "\u67E5\u770B\u8FDB\u5EA6" };
      if (counts.connected) return { title: `\u5DF2\u5B8C\u6210 ${counts.connected} \u4F4D\u6295\u8D44\u4EBA\u5EFA\u8054`, detail: "\u672C\u8F6E\u5339\u914D\u4ECD\u4F1A\u7EE7\u7EED", action: "\u67E5\u770B\u8BB0\u5F55" };
    }
    const labels = {
      submitted: { title: "\u6B63\u5728\u5339\u914D\u6295\u8D44\u4EBA", detail: "\u5DF2\u5B8C\u6210\u8D44\u6599\u4E0E\u6388\u6743\u786E\u8BA4", action: "\u67E5\u770B\u878D\u8D44\u8FDB\u5EA6" },
      matching: { title: "\u6B63\u5728\u5339\u914D\u6295\u8D44\u4EBA", detail: "\u6B63\u6838\u5BF9\u6295\u8D44\u504F\u597D\u4E0E\u9879\u76EE\u6807\u7B7E", action: "\u67E5\u770B\u878D\u8D44\u8FDB\u5EA6" },
      waiting: { title: "\u878D\u8D44\u5339\u914D\u8FDB\u884C\u4E2D", detail: "\u6709\u65B0\u8FDB\u5C55\u65F6\u4F1A\u901A\u8FC7\u5DF2\u5F00\u542F\u6E20\u9053\u901A\u77E5\u4F60", action: "\u67E5\u770B\u878D\u8D44\u8FDB\u5EA6" },
      matched: { title: "\u6709\u65B0\u7684\u6295\u8D44\u4EBA\u5339\u914D\u7ED3\u679C", detail: "\u53EF\u67E5\u770B\u672C\u6279\u63A8\u8350\u53CA\u5177\u4F53\u5339\u914D\u4F9D\u636E", action: "\u67E5\u770B\u5339\u914D\u7ED3\u679C" },
      requested: { title: "\u6295\u8D44\u4EBA\u7533\u8BF7\u5EFA\u8054", detail: "\u8BF7\u786E\u8BA4\u662F\u5426\u540C\u610F\u5E73\u53F0\u534F\u52A9\u5EFA\u8054", action: "\u53BB\u5904\u7406" },
      confirmed: { title: "\u5DF2\u540C\u610F\u6295\u8D44\u4EBA\u5EFA\u8054\u7533\u8BF7", detail: "\u8BF7\u6DFB\u52A0\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1\uFF0C\u7531\u987E\u95EE\u534F\u52A9\u62C9\u7FA4", action: "\u7EE7\u7EED\u5EFA\u8054" },
      connecting: { title: "\u5E73\u53F0\u987E\u95EE\u6B63\u5728\u62C9\u7FA4", detail: "\u540E\u7EED\u4EA4\u6D41\u5C06\u5728\u4F01\u4E1A\u5FAE\u4FE1\u4E2D\u8FDB\u884C", action: "\u67E5\u770B\u8FDB\u5EA6" },
      connected: { title: "\u6295\u8D44\u4EBA\u5EFA\u8054\u5DF2\u5B8C\u6210", detail: "\u4F01\u4E1A\u5FAE\u4FE1\u7FA4\u5DF2\u5EFA\u7ACB\uFF0C\u53EF\u67E5\u770B\u5EFA\u8054\u8BB0\u5F55", action: "\u67E5\u770B\u8BB0\u5F55" },
      declined: { title: "\u5DF2\u6682\u4E0D\u5EFA\u8054", detail: "\u5904\u7406\u7ED3\u679C\u5DF2\u540C\u6B65\u7ED9\u6295\u8D44\u4EBA\u7AEF", action: "\u67E5\u770B\u8BB0\u5F55" },
      withdrawn: { title: "\u6295\u8D44\u4EBA\u5DF2\u64A4\u56DE\u7533\u8BF7", detail: "\u672C\u6B21\u5EFA\u8054\u7533\u8BF7\u5DF2\u7ECF\u7ED3\u675F", action: "\u67E5\u770B\u8BB0\u5F55" },
      expired: { title: "\u5EFA\u8054\u7533\u8BF7\u5DF2\u8D85\u65F6", detail: "\u672C\u6B21\u7533\u8BF7\u5DF2\u81EA\u52A8\u5173\u95ED", action: "\u67E5\u770B\u8BB0\u5F55" },
      paused: { title: "\u878D\u8D44\u5339\u914D\u5DF2\u6682\u505C", detail: "\u6062\u590D\u540E\u5C06\u7EE7\u7EED\u5411\u5408\u9002\u6295\u8D44\u4EBA\u63A8\u8350", action: "\u7BA1\u7406\u672C\u8F6E\u5339\u914D" }
    };
    return labels[fundraisingState.paused ? "paused" : fundraisingState.status] || null;
  }

  // src/data/user.js
  var user = {
    "name": "\u5F20\u660E",
    "company": "\u661F\u8FB0\u79D1\u6280",
    "companyType": "\u521D\u521B\u4F01\u4E1A",
    "stage": "A\u8F6E\u524D",
    "industry": "\u4E92\u8054\u7F51/\u79D1\u6280",
    "scale": "11-50\u4EBA",
    "city": "\u5317\u4EAC",
    "district": "\u6D77\u6DC0\u533A",
    "avatar": "\u5F20"
  };

  // src/data/categories.js
  var categories = [
    {
      "id": "law",
      "name": "\u6CD5\u5F8B\u670D\u52A1",
      "icon": "scale",
      "desc": "\u5408\u540C\xB7\u80A1\u6743\xB7\u878D\u8D44",
      "skus": [
        "\u80A1\u6743\u67B6\u6784\u8BBE\u8BA1",
        "\u5408\u540C\u5BA1\u67E5",
        "\u878D\u8D44\u4EA4\u6613",
        "\u80A1\u6743\u6FC0\u52B1",
        "\u77E5\u8BC6\u4EA7\u6743\u4FDD\u62A4",
        "\u52B3\u52A8\u5408\u89C4"
      ],
      "locked": false
    },
    {
      "id": "business",
      "name": "\u5DE5\u5546\u670D\u52A1",
      "icon": "briefcase",
      "desc": "\u6CE8\u518C\xB7\u53D8\u66F4\xB7\u6CE8\u9500",
      "skus": [
        "\u516C\u53F8\u6CE8\u518C",
        "\u5DE5\u5546\u53D8\u66F4",
        "\u516C\u53F8\u6CE8\u9500",
        "\u5E74\u68C0\u5E74\u62A5",
        "\u8D44\u8D28\u529E\u7406"
      ],
      "locked": false
    },
    {
      "id": "ip",
      "name": "\u77E5\u8BC6\u4EA7\u6743",
      "icon": "shield",
      "desc": "\u5546\u6807\xB7\u4E13\u5229\xB7\u8457\u4F5C\u6743",
      "skus": [
        "\u5546\u6807\u6CE8\u518C",
        "\u4E13\u5229\u7533\u8BF7",
        "\u8457\u4F5C\u6743\u767B\u8BB0",
        "\u5546\u6807\u9A73\u56DE\u590D\u5BA1",
        "\u4E13\u5229\u4FB5\u6743\u5206\u6790"
      ],
      "locked": false
    },
    {
      "id": "finance",
      "name": "\u8D22\u7A0E\u670D\u52A1",
      "icon": "coins",
      "desc": "\u8BB0\u8D26\xB7\u62A5\u7A0E\xB7\u5BA1\u8BA1",
      "locked": true,
      "skus": []
    },
    {
      "id": "policy",
      "name": "\u653F\u7B56\u7533\u62A5",
      "icon": "file-text",
      "desc": "\u9AD8\u4F01\u8BA4\u5B9A\xB7\u9879\u76EE\u7533\u62A5",
      "locked": false,
      "skus": [
        "\u9AD8\u65B0\u6280\u672F\u4F01\u4E1A\u8BA4\u5B9A",
        "\u4E13\u7CBE\u7279\u65B0\u7533\u62A5",
        "\u79D1\u6280\u9879\u76EE\u7533\u62A5"
      ]
    },
    {
      "id": "hr",
      "name": "\u4EBA\u529B\u62DB\u8058",
      "icon": "users",
      "desc": "\u62DB\u8058\xB7\u793E\u4FDD\xB7\u7528\u5DE5",
      "locked": true,
      "skus": []
    }
  ];

  // src/data/orgs.js
  var orgs = [
    {
      "id": "org001",
      "name": "\u5317\u4EAC\u9526\u5929\u5F8B\u5E08\u4E8B\u52A1\u6240",
      "shortName": "\u9526\u5929\u5F8B\u6240",
      "logo": "\u9526",
      "establishedYear": 2006,
      "city": "\u5317\u4EAC",
      "district": "\u671D\u9633\u533A",
      "scale": "100+",
      "fields": [
        "\u8D44\u672C\u5E02\u573A",
        "\u5E76\u8D2D\u91CD\u7EC4",
        "\u77E5\u8BC6\u4EA7\u6743",
        "\u4E89\u8BAE\u89E3\u51B3"
      ],
      "desc": "\u9526\u5929\u5F8B\u5E08\u4E8B\u52A1\u6240\u6210\u7ACB\u4E8E2006\u5E74\uFF0C\u662F\u4E00\u5BB6\u5B9A\u4F4D\u7CBE\u54C1\u5316\u3001\u4E13\u4E1A\u5316\u7684\u7EFC\u5408\u6027\u5F8B\u5E08\u4E8B\u52A1\u6240\u3002\u5F8B\u6240\u4E13\u6CE8\u4E8E\u8D44\u672C\u5E02\u573A\u3001\u5E76\u8D2D\u91CD\u7EC4\u3001\u77E5\u8BC6\u4EA7\u6743\u7B49\u6838\u5FC3\u4E1A\u52A1\u9886\u57DF\uFF0C\u4E3A\u767E\u4F59\u5BB6\u4F01\u4E1A\u63D0\u4F9B\u8FC7\u4E13\u4E1A\u6CD5\u5F8B\u670D\u52A1\u3002",
      "license": "\u6267\u4E1A\u8BB8\u53EF\u8BC1 11-0001-2006",
      "teamIds": [
        "t001",
        "t004"
      ]
    },
    {
      "id": "org002",
      "name": "\u5317\u4EAC\u6B63\u5927\u6CD5\u5F8B\u54A8\u8BE2\u6709\u9650\u516C\u53F8",
      "shortName": "\u6B63\u5927\u6CD5\u52A1",
      "logo": "\u6B63",
      "establishedYear": 2016,
      "city": "\u5317\u4EAC",
      "district": "\u6D77\u6DC0\u533A",
      "scale": "51-100",
      "fields": [
        "\u4F01\u4E1A\u5408\u89C4",
        "\u52B3\u52A8\u6CD5",
        "\u5546\u4E8B\u7EA0\u7EB7"
      ],
      "desc": "\u6B63\u5927\u6CD5\u52A1\u6210\u7ACB\u4E8E2016\u5E74\uFF0C\u4E13\u6CE8\u4E3A\u4F01\u4E1A\u63D0\u4F9B\u5408\u89C4\u7BA1\u7406\u548C\u52B3\u52A8\u6CD5\u5F8B\u4E8B\u52A1\u670D\u52A1\uFF0C\u670D\u52A1\u5BA2\u6237\u6DB5\u76D6\u4E92\u8054\u7F51\u3001\u5236\u9020\u3001\u96F6\u552E\u7B49\u591A\u4E2A\u884C\u4E1A\u3002",
      "license": "\u6267\u4E1A\u8BB8\u53EF\u8BC1 11-0002-2016",
      "teamIds": [
        "t002"
      ]
    },
    {
      "id": "org003",
      "name": "\u5317\u4EAC\u667A\u6743\u77E5\u8BC6\u4EA7\u6743\u4EE3\u7406\u6709\u9650\u516C\u53F8",
      "shortName": "\u667A\u6743IP",
      "logo": "\u667A",
      "establishedYear": 2018,
      "city": "\u5317\u4EAC",
      "district": "\u897F\u57CE\u533A",
      "scale": "\u226450",
      "fields": [
        "\u4E13\u5229\u7533\u8BF7",
        "\u5546\u6807\u6CE8\u518C",
        "\u77E5\u8BC6\u4EA7\u6743\u4FDD\u62A4"
      ],
      "desc": "\u667A\u6743\u77E5\u8BC6\u4EA7\u6743\u6210\u7ACB\u4E8E2018\u5E74\uFF0C\u7531\u524D\u56FD\u77E5\u5C40\u5BA1\u67E5\u5458\u521B\u7ACB\uFF0C\u4E13\u6CE8\u4E8E\u77E5\u8BC6\u4EA7\u6743\u7533\u8BF7\u4E0E\u4FDD\u62A4\uFF0C\u4E3A\u79D1\u6280\u4F01\u4E1A\u63D0\u4F9B\u4E00\u7AD9\u5F0FIP\u670D\u52A1\u3002",
      "license": "\u4E13\u5229\u4EE3\u7406\u8D44\u8D28 11-0003-2018",
      "teamIds": [
        "t003",
        "t006"
      ]
    },
    {
      "id": "org004",
      "name": "\u5317\u4EAC\u901F\u6377\u4F01\u4E1A\u670D\u52A1\u6709\u9650\u516C\u53F8",
      "shortName": "\u901F\u6377",
      "logo": "\u901F",
      "establishedYear": 2019,
      "city": "\u5317\u4EAC",
      "district": "\u671D\u9633\u533A",
      "scale": "\u226450",
      "fields": [
        "\u5DE5\u5546\u6CE8\u518C",
        "\u4EE3\u7406\u8BB0\u8D26",
        "\u4F01\u4E1A\u670D\u52A1"
      ],
      "desc": "\u901F\u6377\u4F01\u4E1A\u670D\u52A1\u6210\u7ACB\u4E8E2019\u5E74\uFF0C\u4E13\u6CE8\u5DE5\u5546\u6CE8\u518C\u548C\u4F01\u4E1A\u670D\u52A1\uFF0C\u5DF2\u4E3A300+\u5BB6\u4F01\u4E1A\u63D0\u4F9B\u6CE8\u518C\u767B\u8BB0\u670D\u52A1\u3002",
      "license": "\u5DE5\u5546\u4EE3\u7406\u8D44\u8D28 11-0004-2019",
      "teamIds": [
        "t005"
      ]
    },
    {
      "id": "org005",
      "name": "\u5317\u4EAC\u6CFD\u8861\u5F8B\u5E08\u4E8B\u52A1\u6240",
      "shortName": "\u6CFD\u8861\u5F8B\u6240",
      "logo": "\u6CFD",
      "establishedYear": 2012,
      "city": "\u5317\u4EAC",
      "district": "\u4E1C\u57CE\u533A",
      "scale": "51-100",
      "fields": [
        "\u6295\u878D\u8D44",
        "\u80A1\u6743\u8BBE\u8BA1",
        "\u516C\u53F8\u6CBB\u7406"
      ],
      "desc": "\u6CFD\u8861\u5F8B\u5E08\u4E8B\u52A1\u6240\u6210\u7ACB\u4E8E2012\u5E74\uFF0C\u4E13\u6CE8\u521D\u521B\u4F01\u4E1A\u6295\u878D\u8D44\u6CD5\u5F8B\u670D\u52A1\uFF0C\u56E2\u961F\u8986\u76D6\u4ECE\u5929\u4F7F\u8F6E\u5230\u6210\u957F\u671F\u7684\u5404\u7C7B\u80A1\u6743\u4EA4\u6613\u573A\u666F\u3002",
      "license": "\u6267\u4E1A\u8BB8\u53EF\u8BC1 11-0005-2012",
      "teamIds": [
        "t007"
      ]
    },
    {
      "id": "org006",
      "name": "\u5317\u4EAC\u660E\u5FB7\u77E5\u8BC6\u4EA7\u6743\u4EE3\u7406\u6709\u9650\u516C\u53F8",
      "shortName": "\u660E\u5FB7IP",
      "logo": "\u660E",
      "establishedYear": 2015,
      "city": "\u5317\u4EAC",
      "district": "\u4E30\u53F0\u533A",
      "scale": "\u226450",
      "fields": [
        "\u5546\u6807\u6CE8\u518C",
        "\u5546\u6807\u590D\u5BA1",
        "\u8457\u4F5C\u6743\u767B\u8BB0"
      ],
      "desc": "\u660E\u5FB7\u77E5\u8BC6\u4EA7\u6743\u6210\u7ACB\u4E8E2015\u5E74\uFF0C\u4E13\u6CE8\u54C1\u724C\u77E5\u8BC6\u4EA7\u6743\u4FDD\u62A4\u4E0E\u5546\u6807\u4EE3\u7406\u670D\u52A1\uFF0C\u4E3A\u6D88\u8D39\u3001\u79D1\u6280\u3001\u6587\u5316\u7B49\u884C\u4E1A\u5BA2\u6237\u63D0\u4F9B\u5168\u6D41\u7A0BIP\u670D\u52A1\u3002",
      "license": "\u5546\u6807\u4EE3\u7406\u8D44\u8D28 11-0006-2015",
      "teamIds": [
        "t008"
      ]
    },
    {
      "id": "org007",
      "name": "\u5317\u4EAC\u542F\u7B56\u4F01\u4E1A\u54A8\u8BE2\u6709\u9650\u516C\u53F8",
      "shortName": "\u542F\u7B56\u54A8\u8BE2",
      "logo": "\u542F",
      "establishedYear": 2018,
      "city": "\u5317\u4EAC",
      "district": "\u6D77\u6DC0\u533A",
      "scale": "\u226450",
      "fields": ["\u9AD8\u65B0\u6280\u672F\u4F01\u4E1A\u8BA4\u5B9A", "\u4E13\u7CBE\u7279\u65B0\u7533\u62A5", "\u79D1\u6280\u9879\u76EE\u7533\u62A5"],
      "desc": "\u542F\u7B56\u54A8\u8BE2\u4E13\u6CE8\u79D1\u6280\u4F01\u4E1A\u653F\u7B56\u9879\u76EE\u670D\u52A1\uFF0C\u63D0\u4F9B\u8D44\u683C\u8BC4\u4F30\u3001\u7533\u62A5\u89C4\u5212\u3001\u6750\u6599\u6574\u7406\u548C\u8FDB\u5EA6\u8DDF\u8FDB\u3002",
      "license": "\u4F01\u4E1A\u670D\u52A1\u8D44\u6599 \xB7 \u5DF2\u6838\u9A8C",
      "teamIds": ["t009"]
    }
  ];

  // src/services/lookup.js
  function getTeam(id, teamList = teams) {
    return teamList.find((team) => team.id === id);
  }
  function getOrg(id, orgList = orgs) {
    return orgList.find((org) => org.id === id);
  }
  function getDemand(id, demandList = demands) {
    return demandList.find((demand) => demand.id === id);
  }
  function getCategory(id, categoryList = categories) {
    return categoryList.find((category) => category.id === id);
  }
  function getTeamsByCategory(catId, teamList = teams, categoryList = categories) {
    const category = getCategory(catId, categoryList);
    if (!category) return [];
    return teamList.filter((team) => team.skus.some((sku) => category.skus.includes(sku)));
  }
  function getTeamsByOrg(orgId, teamList = teams) {
    return teamList.filter((team) => team.orgId === orgId);
  }
  function getCategoryForSku(sku, categoryList = categories) {
    return categoryList.find((category) => category.skus.includes(sku)) || null;
  }
  function getCategoryForTeam(team, categoryList = categories) {
    if (!team || !team.skus || !team.skus.length) return null;
    return getCategoryForSku(team.skus[0], categoryList);
  }
  function getAcceptedRecord(demand, teamId) {
    if (!demand || !teamId) return null;
    return (demand.accepted || []).find((item) => item.teamId === teamId) || null;
  }
  function getChatMessages(demandId, teamId, messages = chatMessages) {
    if (!messages[demandId]) messages[demandId] = {};
    if (!messages[demandId][teamId]) messages[demandId][teamId] = [];
    return messages[demandId][teamId];
  }
  function isKnownSku(sku, categoryList = categories) {
    if (!sku) return false;
    return categoryList.some((category) => category.skus.includes(sku));
  }
  function getTeamRatingDimensions(team) {
    if (!team) return {};
    if (!team.ratingDimensions) {
      const base = Number(team.rating || 4.8);
      team.ratingDimensions = {
        professional: Math.min(5, Math.round((base + 0.1) * 10) / 10),
        response: Math.max(1, Math.round((base - 0.1) * 10) / 10),
        communication: base,
        delivery: base
      };
    }
    return team.ratingDimensions;
  }

  // src/domain/chat.js
  function appendChatMessage(demandId, teamId, message, messages = chatMessages) {
    getChatMessages(demandId, teamId, messages).push(message);
  }

  // src/domain/timeline.js
  function pad(value) {
    return value < 10 ? `0${value}` : String(value);
  }
  var PLATFORM_TIMELINE_REFERENCE = Object.freeze({ year: 2026, verificationMonth: 8 });
  function establishedYears(establishedYear) {
    return PLATFORM_TIMELINE_REFERENCE.year - establishedYear;
  }
  function platformVerificationMonth() {
    return `${PLATFORM_TIMELINE_REFERENCE.year}-${pad(PLATFORM_TIMELINE_REFERENCE.verificationMonth)}`;
  }
  function nowLabel(date = /* @__PURE__ */ new Date()) {
    return `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
  function todayLabel(date = /* @__PURE__ */ new Date()) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }
  function responseDeadlineLabel(minutes, now = Date.now()) {
    const date = new Date(now + (minutes || 30) * 6e4);
    return `\u4ECA\u5929 ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
  function addTimelineEvent(demand, kind, title, desc, getTime = nowLabel) {
    if (!demand) return;
    if (!demand.timeline) demand.timeline = [];
    demand.timeline.push({ kind, title, desc: desc || "", time: getTime() });
  }

  // src/domain/plan.js
  var DELIVERABLES = Object.freeze({
    \u878D\u8D44\u4EA4\u6613: ["\u4EA4\u6613\u7ED3\u6784\u5EFA\u8BAE", "\u4EA4\u6613\u6587\u4EF6\u8D77\u8349\u4E0E\u5BA1\u9605", "\u8C08\u5224\u4E0E\u4EA4\u5272\u652F\u6301"],
    \u80A1\u6743\u67B6\u6784\u8BBE\u8BA1: ["\u80A1\u6743\u7ED3\u6784\u65B9\u6848", "\u5408\u4F19\u4EBA\u534F\u8BAE\u5EFA\u8BAE", "\u671F\u6743\u6C60\u8BBE\u7F6E\u5EFA\u8BAE"],
    \u5408\u540C\u5BA1\u67E5: ["\u5408\u540C\u98CE\u9669\u6E05\u5355", "\u4FEE\u8BA2\u7A3F", "\u91CD\u70B9\u6761\u6B3E\u8BF4\u660E"],
    \u5546\u6807\u6CE8\u518C: ["\u5546\u6807\u68C0\u7D22\u62A5\u544A", "\u7533\u8BF7\u6750\u6599", "\u53D7\u7406\u901A\u77E5\u4E66"],
    \u516C\u53F8\u6CE8\u518C: ["\u6838\u540D\u7ED3\u679C", "\u8BBE\u7ACB\u767B\u8BB0\u6750\u6599", "\u8425\u4E1A\u6267\u7167\u9886\u53D6\u6307\u5F15"]
  });
  function createPlanBase(demand, teamId, options) {
    const materials = options.materialPool || materialPool;
    const record = getAcceptedRecord(demand, teamId) || {};
    const periodField = (demand.fields || []).find((item) => item.label === "\u671F\u671B\u5B8C\u6210\u65F6\u95F4");
    const quote = record.quote || "\u6C9F\u901A\u540E\u786E\u8BA4";
    return {
      teamId,
      version: 1,
      status: "awaiting_confirmation",
      scope: `\u56F4\u7ED5\u201C${demand.sku}\u201D\u5B8C\u6210\u9700\u6C42\u68B3\u7406\u3001\u65B9\u6848\u5236\u5B9A\u548C\u7EA6\u5B9A\u6210\u679C\u4EA4\u4ED8`,
      finalQuote: quote,
      period: periodField ? periodField.value : "\u53CC\u65B9\u786E\u8BA4\u540E\u6392\u671F",
      deliverables: (DELIVERABLES[demand.sku] || ["\u670D\u52A1\u65B9\u6848", "\u7EA6\u5B9A\u6210\u679C\u6587\u4EF6"]).slice(),
      exclusions: ["\u9700\u6C42\u8303\u56F4\u5916\u7684\u65B0\u589E\u4E8B\u9879", "\u7B2C\u4E09\u65B9\u673A\u6784\u6536\u53D6\u7684\u884C\u653F\u6216\u9274\u5B9A\u8D39\u7528"],
      costItems: [{ label: "\u57FA\u7840\u670D\u52A1\u8D39", amount: quote }],
      paymentMilestones: ["\u4ED8\u6B3E\u65B9\u5F0F\u7531\u5BA2\u6237\u4E0E\u670D\u52A1\u5546\u5728\u534F\u8BAE\u4E2D\u7EA6\u5B9A", "\u5E73\u53F0\u6682\u4E0D\u63D0\u4F9B\u8D44\u91D1\u6258\u7BA1"],
      validity: "\u62A5\u4EF7\u53D1\u51FA\u540E7\u5929\u5185\u6709\u6548",
      attachment: "\u670D\u52A1\u65B9\u6848\u8BF4\u660E.pdf",
      materials: (record.needMaterials || materials[demand.sku] || materials.default).slice(),
      confirmedAt: null
    };
  }
  function buildServicePlan(demand, teamId, options = {}, existingPlan = null) {
    const base = createPlanBase(demand, teamId, options);
    const plan = existingPlan || base;
    Object.keys(base).forEach((key) => {
      if (plan[key] === void 0 || plan[key] === null) plan[key] = base[key];
    });
    return plan;
  }
  function normalizeServicePlan(plan, demand, teamId, options = {}) {
    return buildServicePlan(demand, teamId, options, plan);
  }
  function getServicePlan(demand, teamId, options = {}) {
    if (!demand || !teamId) return null;
    let plan = demand.servicePlan && demand.servicePlan.teamId === teamId ? demand.servicePlan : (demand.planDrafts || {})[teamId] || null;
    if (!plan) {
      if (!demand.planDrafts) demand.planDrafts = {};
      plan = buildServicePlan(demand, teamId, options);
      demand.planDrafts[teamId] = plan;
    }
    return normalizeServicePlan(plan, demand, teamId, options);
  }
  function getServicePlanVersion(demand, teamId, version, options = {}) {
    const current = getServicePlan(demand, teamId, options);
    if (!version || Number(current.version || 1) === Number(version)) return current;
    const histories = (demand.planHistories || {})[teamId] || [];
    return histories.find((item) => Number(item.version || 1) === Number(version)) || current;
  }
  function submitServicePlan(demand, teamId, options = {}) {
    if (!demand || !teamId) return false;
    const messages = options.chatMessages || chatMessages;
    const getTime = options.nowLabel || nowLabel;
    if (options.startCommunication) options.startCommunication(demand, teamId, options);
    const plan = getServicePlan(demand, teamId, options);
    const conversation = getChatMessages(demand.id, teamId, messages);
    const exists = conversation.some((item) => item.type === "plan_card" && Number(item.version || 1) === Number(plan.version || 1));
    plan.submittedAt = plan.submittedAt || getTime();
    plan.status = "awaiting_confirmation";
    demand.candidateTeam = teamId;
    demand.status = "plan_pending";
    demand.progress = "\u670D\u52A1\u56E2\u961F\u5DF2\u63D0\u4EA4\u670D\u52A1\u65B9\u6848\uFF0C\u7B49\u5F85\u786E\u8BA4";
    if (!exists) {
      appendChatMessage(demand.id, teamId, { type: "team", text: "\u670D\u52A1\u56E2\u961F\u5DF2\u6839\u636E\u5E73\u53F0\u540C\u6B65\u7684\u4FE1\u606F\u6574\u7406\u597D\u670D\u52A1\u65B9\u6848\uFF0C\u8BF7\u67E5\u770B\u3002" }, messages);
      appendChatMessage(demand.id, teamId, { type: "plan_card", version: plan.version }, messages);
      addTimelineEvent(demand, "plan", "\u670D\u52A1\u56E2\u961F\u5DF2\u63D0\u4EA4\u670D\u52A1\u65B9\u6848", `${plan.finalQuote} \xB7 ${plan.period}`, getTime);
    }
    return plan;
  }
  function providerUpdateServicePlan(demand, teamId, options = {}) {
    const messages = options.chatMessages || chatMessages;
    const getTime = options.nowLabel || nowLabel;
    const plan = getServicePlan(demand, teamId, options);
    if (!plan || plan.confirmedAt) return false;
    if (!demand.planHistories) demand.planHistories = {};
    if (!demand.planHistories[teamId]) demand.planHistories[teamId] = [];
    demand.planHistories[teamId].push(JSON.parse(JSON.stringify(plan)));
    const next = JSON.parse(JSON.stringify(plan));
    next.version = Number(plan.version || 1) + 1;
    next.status = "awaiting_confirmation";
    next.confirmedAt = null;
    next.revisedAt = getTime();
    next.submittedAt = getTime();
    next.changeSummary = "\u670D\u52A1\u8303\u56F4\u548C\u4EA4\u4ED8\u5B89\u6392\u5DF2\u66F4\u65B0";
    const oldAmount = String(plan.finalQuote || "").match(/\d+(?:\.\d+)?/);
    if (oldAmount && String(plan.finalQuote).includes("\u4E07")) {
      next.finalQuote = `${Math.round((Number.parseFloat(oldAmount[0]) + 0.15) * 100) / 100}\u4E07 \xB7 \u6309\u9879\u76EE\u62A5\u4EF7`;
      next.changeSummary = "\u62A5\u4EF7\u589E\u52A0 \xA51,500\uFF0C\u670D\u52A1\u5468\u671F\u589E\u52A0 5 \u5929\uFF0C\u5E76\u8865\u5145\u4E00\u9879\u4EA4\u4ED8\u6210\u679C";
    } else {
      next.changeSummary = "\u670D\u52A1\u5468\u671F\u589E\u52A0 5 \u5929\uFF0C\u5E76\u8865\u5145\u4E00\u9879\u4EA4\u4ED8\u6210\u679C";
    }
    next.period = `${String(plan.period || "\u53CC\u65B9\u786E\u8BA4\u540E\u6392\u671F")}\uFF0C\u589E\u52A05\u5929`;
    next.deliverables = (plan.deliverables || []).concat(["\u8865\u5145\u4EA4\u4ED8\u6210\u679C\u8BF4\u660E"]);
    next.costItems = [{ label: "\u8C03\u6574\u540E\u670D\u52A1\u8D39", amount: next.finalQuote }];
    next.attachment = "\u670D\u52A1\u65B9\u6848\u8BF4\u660E.pdf";
    demand.planDrafts[teamId] = next;
    demand.status = "plan_pending";
    demand.candidateTeam = teamId;
    demand.progress = "\u670D\u52A1\u56E2\u961F\u5DF2\u66F4\u65B0\u670D\u52A1\u65B9\u6848\uFF0C\u7B49\u5F85\u786E\u8BA4";
    appendChatMessage(demand.id, teamId, { type: "system", text: "\u670D\u52A1\u56E2\u961F\u5DF2\u6839\u636E\u6700\u65B0\u786E\u8BA4\u7684\u4FE1\u606F\u66F4\u65B0\u670D\u52A1\u65B9\u6848\u3002" }, messages);
    appendChatMessage(demand.id, teamId, { type: "plan_card", version: next.version }, messages);
    addTimelineEvent(demand, "plan", "\u670D\u52A1\u56E2\u961F\u5DF2\u66F4\u65B0\u670D\u52A1\u65B9\u6848", next.changeSummary, getTime);
    return next;
  }
  function confirmServicePlan(demand, teamId, options = {}) {
    if (!demand || !teamId) return false;
    const teamList = options.teams || teams;
    const messages = options.chatMessages || chatMessages;
    const getTime = options.nowLabel || nowLabel;
    if (options.startCommunication) options.startCommunication(demand, teamId, options);
    const team = getTeam(teamId, teamList);
    const plan = getServicePlan(demand, teamId, options);
    const firstConfirmation = !plan.confirmedAt;
    plan.status = "confirmed";
    plan.confirmedAt = getTime();
    demand.servicePlan = plan;
    demand.chosenTeam = teamId;
    demand.candidateTeam = null;
    demand.status = "contract_pending";
    demand.pending = [];
    demand.responseClosed = true;
    demand.progress = "\u670D\u52A1\u65B9\u6848\u5DF2\u786E\u8BA4\uFF0C\u7B49\u5F85\u7B7E\u7F72\u670D\u52A1\u534F\u8BAE";
    if (firstConfirmation) {
      appendChatMessage(demand.id, teamId, { type: "system", text: "\u670D\u52A1\u65B9\u6848\u5DF2\u786E\u8BA4\uFF0C\u5DF2\u9009\u62E9\u8BE5\u56E2\u961F\u3002\u4E0B\u4E00\u6B65\u8BF7\u7B7E\u7F72\u670D\u52A1\u534F\u8BAE\u3002" }, messages);
    }
    addTimelineEvent(demand, "choose", `\u5DF2\u786E\u8BA4 ${team ? team.name : "\u670D\u52A1\u56E2\u961F"} \u7684\u670D\u52A1\u65B9\u6848`, `${plan.finalQuote} \xB7 ${plan.period} \xB7 \u5176\u4ED6\u56E2\u961F\u9080\u8BF7\u5DF2\u5173\u95ED`, getTime);
    if (!demand.agreement && options.createAgreementForDemand) {
      options.createAgreementForDemand(demand, teamId, options);
    }
    return true;
  }

  // src/domain/agreement.js
  function createAgreementForDemand(demand, teamId, options = {}) {
    const teamList = options.teams || teams;
    const userData = options.user || user;
    const messages = options.chatMessages || chatMessages;
    const getTime = options.nowLabel || nowLabel;
    const team = getTeam(teamId, teamList);
    const plan = getServicePlan(demand, teamId, options);
    demand.agreement = {
      id: `AG-${demand.id.toUpperCase()}`,
      title: `${demand.sku}\u670D\u52A1\u534F\u8BAE`,
      teamId,
      customer: userData.company,
      provider: team ? team.orgName : "\u670D\u52A1\u673A\u6784",
      service: demand.sku,
      amount: plan.finalQuote,
      period: plan.period,
      template: `${demand.sku}\u6807\u51C6\u670D\u52A1\u534F\u8BAE.pdf`,
      status: "customer_action",
      submittedAt: getTime(),
      customerFile: "",
      providerFile: ""
    };
    appendChatMessage(demand.id, teamId, { type: "agreement_card" }, messages);
    return demand.agreement;
  }
  function uploadCustomerAgreement(demand, fileName, options = {}) {
    if (!demand || !demand.agreement || demand.agreement.status !== "customer_action") return false;
    const messages = options.chatMessages || chatMessages;
    const getTime = options.nowLabel || nowLabel;
    demand.agreement.customerFile = fileName || "\u5BA2\u6237\u5DF2\u7528\u5370\u534F\u8BAE.pdf";
    demand.agreement.customerUploadedAt = getTime();
    demand.agreement.status = "provider_signing";
    demand.progress = "\u5BA2\u6237\u5DF2\u4E0A\u4F20\u7528\u5370\u534F\u8BAE\uFF0C\u7B49\u5F85\u670D\u52A1\u5546\u7528\u5370";
    appendChatMessage(demand.id, demand.chosenTeam, { type: "system", text: "\u4F60\u5DF2\u4E0A\u4F20\u7528\u5370\u534F\u8BAE\uFF0C\u6B63\u5728\u7B49\u5F85\u670D\u52A1\u5546\u5B8C\u6210\u7528\u5370\u3002" }, messages);
    addTimelineEvent(demand, "file", "\u5BA2\u6237\u5DF2\u4E0A\u4F20\u7528\u5370\u534F\u8BAE", demand.agreement.customerFile, getTime);
    return true;
  }
  function setAgreementStatus(demand, status, options = {}) {
    if (!demand || !demand.agreement) return false;
    const messages = options.chatMessages || chatMessages;
    const getTime = options.nowLabel || nowLabel;
    demand.agreement.status = status;
    if (status === "provider_signing") {
      demand.progress = "\u7B49\u5F85\u670D\u52A1\u5546\u7528\u5370\u5E76\u4E0A\u4F20\u534F\u8BAE";
    } else if (status === "auditing") {
      demand.agreement.providerFile = "\u53CC\u65B9\u7528\u5370\u670D\u52A1\u534F\u8BAE.pdf";
      demand.agreement.providerUploadedAt = getTime();
      demand.progress = "\u53CC\u65B9\u5DF2\u5B8C\u6210\u7528\u5370\uFF0C\u5E73\u53F0\u5BA1\u6838\u4E2D";
      appendChatMessage(demand.id, demand.chosenTeam, { type: "system", text: "\u670D\u52A1\u5546\u5DF2\u4E0A\u4F20\u53CC\u65B9\u7528\u5370\u534F\u8BAE\uFF0C\u5E73\u53F0\u6B63\u5728\u5BA1\u6838\u3002" }, messages);
      addTimelineEvent(demand, "file", "\u670D\u52A1\u5546\u5DF2\u5B8C\u6210\u7528\u5370", "\u53CC\u65B9\u7528\u5370\u534F\u8BAE\u5DF2\u63D0\u4EA4\u5E73\u53F0\u5BA1\u6838", getTime);
    } else if (status === "approved") {
      demand.agreement.approvedAt = getTime();
      demand.status = "active";
      demand.progress = "\u670D\u52A1\u534F\u8BAE\u5BA1\u6838\u901A\u8FC7\uFF0C\u670D\u52A1\u8FDB\u884C\u4E2D";
      appendChatMessage(demand.id, demand.chosenTeam, { type: "system", text: "\u670D\u52A1\u534F\u8BAE\u5BA1\u6838\u901A\u8FC7\uFF0C\u56E2\u961F\u5DF2\u5F00\u59CB\u4EA4\u4ED8\u3002" }, messages);
      addTimelineEvent(demand, "check", "\u670D\u52A1\u534F\u8BAE\u5BA1\u6838\u901A\u8FC7", "\u670D\u52A1\u56E2\u961F\u5F00\u59CB\u6309\u534F\u8BAE\u7EA6\u5B9A\u4EA4\u4ED8", getTime);
    }
    return true;
  }

  // src/domain/demandStatus.js
  var STATUS_TEXT = Object.freeze({
    pending: "\u7B49\u5F85\u54CD\u5E94",
    choosing: "\u9009\u62E9\u56E2\u961F",
    communicating: "\u4FE1\u606F\u786E\u8BA4",
    plan_pending: "\u5F85\u786E\u8BA4\u65B9\u6848",
    contract_pending: "\u7B7E\u7F72\u534F\u8BAE",
    active: "\u670D\u52A1\u8FDB\u884C\u4E2D",
    acceptance: "\u5F85\u9A8C\u6536",
    done: "\u5DF2\u5B8C\u6210\xB7\u5F85\u8BC4\u4EF7",
    cancelled: "\u5DF2\u53D6\u6D88"
  });
  var STATUS_COLOR = Object.freeze({
    pending: "var(--color-warning)",
    choosing: "var(--color-warning)",
    communicating: "var(--color-primary)",
    plan_pending: "var(--color-primary)",
    contract_pending: "var(--color-warning)",
    active: "var(--color-success)",
    acceptance: "var(--color-warning)",
    done: "var(--color-success)",
    cancelled: "var(--color-text-4)"
  });
  var STATUS_BACKGROUND = Object.freeze({
    pending: "var(--color-warning-light)",
    choosing: "var(--color-warning-light)",
    communicating: "var(--color-primary-light)",
    plan_pending: "var(--color-primary-light)",
    contract_pending: "var(--color-warning-light)",
    active: "var(--color-success-light)",
    acceptance: "var(--color-warning-light)",
    done: "var(--color-success-light)",
    cancelled: "var(--color-divider)"
  });
  var STATUS_FILTERS = Object.freeze([
    Object.freeze({ key: "all", label: "\u5168\u90E8" }),
    Object.freeze({ key: "pending", label: "\u5F85\u54CD\u5E94" }),
    Object.freeze({ key: "decision", label: "\u5F85\u786E\u8BA4" }),
    Object.freeze({ key: "service", label: "\u670D\u52A1\u4E2D" }),
    Object.freeze({ key: "ended", label: "\u5DF2\u7ED3\u675F" })
  ]);
  var FUTURE_STEPS = Object.freeze({
    pending: [
      { title: "\u7B49\u5F85\u56E2\u961F\u54CD\u5E94", desc: "\u6709\u56E2\u961F\u54CD\u5E94\u540E\u4F1A\u7B2C\u4E00\u65F6\u95F4\u901A\u77E5\u4F60" },
      { title: "\u67E5\u770B\u56E2\u961F\u54CD\u5E94", desc: "\u901A\u8FC7\u5E73\u53F0\u52A9\u624B\u8865\u5145\u57FA\u7840\u9700\u6C42\u4FE1\u606F" },
      { title: "\u786E\u8BA4\u670D\u52A1\u65B9\u6848", desc: "\u786E\u8BA4\u65B9\u6848\u540E\u5373\u9009\u5B9A\u8BE5\u670D\u52A1\u56E2\u961F" },
      { title: "\u7B7E\u7F72\u670D\u52A1\u534F\u8BAE", desc: "\u53CC\u65B9\u7528\u5370\u540E\u7531\u5E73\u53F0\u5BA1\u6838\u534F\u8BAE" },
      { title: "\u4EA4\u4ED8\u4E0E\u9A8C\u6536", desc: "\u56E2\u961F\u63D0\u4EA4\u6210\u679C\u540E\u7531\u4F60\u786E\u8BA4\u9A8C\u6536" },
      { title: "\u8BC4\u4EF7\u670D\u52A1", desc: "\u9A8C\u6536\u5B8C\u6210\u540E\u53EF\u4EE5\u8BC4\u4EF7" }
    ],
    choosing: [
      { title: "\u8865\u5145\u9700\u6C42\u4FE1\u606F", desc: "\u7531\u5E73\u53F0\u52A9\u624B\u6574\u7406\u5E76\u540C\u6B65\u7ED9\u670D\u52A1\u56E2\u961F" },
      { title: "\u786E\u8BA4\u670D\u52A1\u65B9\u6848", desc: "\u786E\u8BA4\u65B9\u6848\u540E\u5373\u9009\u5B9A\u8BE5\u670D\u52A1\u56E2\u961F" },
      { title: "\u7B7E\u7F72\u670D\u52A1\u534F\u8BAE", desc: "\u53CC\u65B9\u7528\u5370\u540E\u7531\u5E73\u53F0\u5BA1\u6838\u534F\u8BAE" },
      { title: "\u4EA4\u4ED8\u4E0E\u9A8C\u6536", desc: "\u56E2\u961F\u63D0\u4EA4\u6210\u679C\u540E\u7531\u4F60\u786E\u8BA4\u9A8C\u6536" },
      { title: "\u8BC4\u4EF7\u670D\u52A1", desc: "\u9A8C\u6536\u5B8C\u6210\u540E\u53EF\u4EE5\u8BC4\u4EF7" }
    ],
    communicating: [
      { title: "\u786E\u8BA4\u670D\u52A1\u65B9\u6848", desc: "\u6838\u5BF9\u670D\u52A1\u5185\u5BB9\u3001\u62A5\u4EF7\u3001\u5468\u671F\u548C\u4EA4\u4ED8\u6210\u679C" },
      { title: "\u7B7E\u7F72\u670D\u52A1\u534F\u8BAE", desc: "\u53CC\u65B9\u7528\u5370\u540E\u7531\u5E73\u53F0\u5BA1\u6838\u534F\u8BAE" },
      { title: "\u4EA4\u4ED8\u4E0E\u9A8C\u6536", desc: "\u56E2\u961F\u63D0\u4EA4\u6210\u679C\u540E\u7531\u4F60\u786E\u8BA4\u9A8C\u6536" },
      { title: "\u8BC4\u4EF7\u670D\u52A1", desc: "\u9A8C\u6536\u5B8C\u6210\u540E\u53EF\u4EE5\u8BC4\u4EF7" }
    ],
    plan_pending: [
      { title: "\u786E\u8BA4\u670D\u52A1\u65B9\u6848", desc: "\u786E\u8BA4\u540E\u5373\u9009\u5B9A\u56E2\u961F" },
      { title: "\u7B7E\u7F72\u670D\u52A1\u534F\u8BAE", desc: "\u53CC\u65B9\u7528\u5370\u540E\u7531\u5E73\u53F0\u5BA1\u6838\u534F\u8BAE" },
      { title: "\u4EA4\u4ED8\u4E0E\u9A8C\u6536", desc: "\u56E2\u961F\u63D0\u4EA4\u6210\u679C\u540E\u7531\u4F60\u786E\u8BA4\u9A8C\u6536" },
      { title: "\u8BC4\u4EF7\u670D\u52A1", desc: "\u9A8C\u6536\u5B8C\u6210\u540E\u53EF\u4EE5\u8BC4\u4EF7" }
    ],
    contract_pending: [
      { title: "\u5B8C\u6210\u670D\u52A1\u534F\u8BAE", desc: "\u6309\u6D88\u606F\u5361\u7247\u63D0\u793A\u8865\u5145\u4FE1\u606F\u3001\u7528\u5370\u5E76\u4E0A\u4F20" },
      { title: "\u5E73\u53F0\u5BA1\u6838\u534F\u8BAE", desc: "\u5BA1\u6838\u901A\u8FC7\u540E\u8FDB\u5165\u670D\u52A1\u4EA4\u4ED8" },
      { title: "\u4EA4\u4ED8\u4E0E\u9A8C\u6536", desc: "\u56E2\u961F\u63D0\u4EA4\u6210\u679C\u540E\u7531\u4F60\u786E\u8BA4\u9A8C\u6536" },
      { title: "\u8BC4\u4EF7\u670D\u52A1", desc: "\u9A8C\u6536\u5B8C\u6210\u540E\u53EF\u4EE5\u8BC4\u4EF7" }
    ],
    active: [
      { title: "\u56E2\u961F\u63D0\u4EA4\u6210\u679C", desc: "\u6309\u5DF2\u786E\u8BA4\u7684\u670D\u52A1\u65B9\u6848\u5B8C\u6210\u4EA4\u4ED8" },
      { title: "\u786E\u8BA4\u9A8C\u6536", desc: "\u6838\u5BF9\u6210\u679C\u65E0\u8BEF\u540E\u786E\u8BA4" },
      { title: "\u8BC4\u4EF7\u670D\u52A1", desc: "\u9A8C\u6536\u5B8C\u6210\u540E\u53EF\u4EE5\u8BC4\u4EF7" }
    ],
    acceptance: [
      { title: "\u786E\u8BA4\u9A8C\u6536", desc: "\u6838\u5BF9\u6210\u679C\u65E0\u8BEF\u540E\u786E\u8BA4" },
      { title: "\u8BC4\u4EF7\u670D\u52A1", desc: "\u9A8C\u6536\u5B8C\u6210\u540E\u53EF\u4EE5\u8BC4\u4EF7" }
    ],
    cancelled: [
      { title: "\u53EF\u4FEE\u6539\u540E\u91CD\u65B0\u63D0\u4EA4", desc: "\u539F\u9700\u6C42\u5185\u5BB9\u4F1A\u88AB\u9884\u586B\uFF0C\u6539\u5B8C\u5373\u53EF\u91CD\u65B0\u53D1\u51FA" }
    ]
  });
  var PRIORITY = Object.freeze({
    acceptance: 1,
    plan_pending: 2,
    contract_pending: 2.5,
    choosing: 3,
    communicating: 4,
    active: 5,
    pending: 6,
    done: 7,
    cancelled: 8
  });
  var TODO_STATUS_TEXT = Object.freeze({
    pending: "\u7B49\u5F85\u54CD\u5E94",
    choosing: "\u9009\u62E9\u56E2\u961F",
    communicating: "\u8865\u5145\u4FE1\u606F",
    plan_pending: "\u786E\u8BA4\u65B9\u6848",
    contract_pending: "\u7B7E\u7F72\u534F\u8BAE",
    active: "\u67E5\u770B\u670D\u52A1",
    acceptance: "\u786E\u8BA4\u9A8C\u6536",
    done: "\u53BB\u8BC4\u4EF7"
  });
  var TODO_PRIORITY = Object.freeze({
    acceptance: 1,
    contract_pending: 2,
    plan_pending: 3,
    choosing: 4,
    communicating: 5,
    active: 6,
    done: 7,
    pending: 8
  });
  function getDemandStatusText(demand) {
    if (!demand) return "";
    if (demand.status === "done") {
      return demand.hasReview ? "\u5DF2\u5B8C\u6210\xB7\u5DF2\u8BC4\u4EF7" : STATUS_TEXT.done;
    }
    return STATUS_TEXT[demand.status] || demand.status;
  }
  function getLatestTodo(demandList) {
    return demandList.filter((demand) => demand.status !== "cancelled").slice().sort((left, right) => {
      const leftPriority = TODO_PRIORITY[left.status] || 99;
      const rightPriority = TODO_PRIORITY[right.status] || 99;
      if (leftPriority !== rightPriority) return leftPriority - rightPriority;
      return left.date < right.date ? 1 : -1;
    })[0] || null;
  }
  function getTodoTarget(demand) {
    if (demand.status === "choosing") return { page: "p6", params: { demandId: demand.id, tab: "accepted" } };
    if (["communicating", "plan_pending", "contract_pending"].includes(demand.status)) {
      return {
        page: "p7",
        params: {
          demandId: demand.id,
          teamId: demand.chosenTeam || demand.candidateTeam || (demand.accepted[0] || {}).teamId,
          open: demand.status === "contract_pending" ? "agreement" : void 0
        }
      };
    }
    if (demand.status === "acceptance") return { page: "p6", params: { demandId: demand.id, tab: "delivery" } };
    if (demand.status === "done" && !demand.hasReview) return { page: "p8", params: { demandId: demand.id } };
    return { page: "p6", params: { demandId: demand.id, tab: "progress" } };
  }
  function refreshDemandStatus(demand, addEvent = addTimelineEvent) {
    if (!demand) return;
    if (["contract_pending", "active", "acceptance", "done"].includes(demand.status)) return;
    const acceptedCount = (demand.accepted || []).length;
    const waitingCount = (demand.pending || []).filter((pending) => !pending.isTimeout).length;
    const timeoutCount = (demand.timedOut || []).length;
    const rejectedCount = (demand.rejected || []).length;
    if (["communicating", "plan_pending"].includes(demand.status)) {
      demand.progress = `\u6B63\u5728\u786E\u8BA4\u670D\u52A1\u65B9\u6848 \xB7 \u5DF2\u6709 ${acceptedCount} \u5BB6\u54CD\u5E94${waitingCount > 0 ? `\uFF0C\u53E6\u6709 ${waitingCount} \u5BB6\u7B49\u5F85\u4E2D` : ""}`;
      return;
    }
    if (acceptedCount > 0) {
      demand.status = "choosing";
      demand.progress = `\u5DF2\u6709 ${acceptedCount} \u5BB6\u670D\u52A1\u56E2\u961F\u53EF\u4F9B\u9009\u62E9${waitingCount > 0 ? `\uFF08\u53E6\u6709 ${waitingCount} \u5BB6\u5F85\u54CD\u5E94\uFF09` : ""}`;
      return;
    }
    if (waitingCount > 0) {
      demand.status = "pending";
      demand.progress = `\u5DF2\u53D1\u9001\u7ED9 ${demand.totalInvited || waitingCount} \u5BB6\u56E2\u961F\uFF0C\u7B49\u5F85\u54CD\u5E94`;
      return;
    }
    if (timeoutCount > 0) {
      demand.status = "pending";
      demand.waitedOverHour = true;
      demand.progress = "\u8D85\u8FC71\u5C0F\u65F6\u6682\u65E0\u56E2\u961F\u54CD\u5E94";
      return;
    }
    if (rejectedCount > 0) {
      demand.status = "cancelled";
      demand.progress = "\u5DF2\u7ED3\u675F\xB7\u5168\u90E8\u672A\u627F\u63A5";
      addEvent(demand, "cancel", "\u672C\u8F6E\u5339\u914D\u5DF2\u7ED3\u675F", "\u6682\u672A\u627E\u5230\u5408\u9002\u56E2\u961F\uFF0C\u53EF\u8C03\u6574\u9700\u6C42\u6216\u7EE7\u7EED\u7531\u5E73\u53F0\u534F\u52A9\u5339\u914D");
    }
  }
  function getTodoDemands(demandList) {
    return demandList.filter((demand) => [
      "pending",
      "choosing",
      "communicating",
      "plan_pending",
      "contract_pending",
      "acceptance"
    ].includes(demand.status) || demand.status === "done" && !demand.hasReview);
  }

  // src/domain/matching.js
  function seed(value) {
    let hash = 0;
    const text = String(value || "");
    for (let index = 0; index < text.length; index += 1) {
      hash = (hash * 31 + text.charCodeAt(index)) % 1e5;
    }
    return hash;
  }
  function pick(items, value) {
    if (!items || !items.length) return "";
    return items[value % items.length];
  }
  function getMatchResults(spec = {}, options = {}) {
    const teamList = options.teams || teams;
    const categoryList = options.categories || categories;
    const sku = spec.sku || "";
    const categoryId = spec.categoryId || (getCategoryForSku(sku, categoryList) || {}).id;
    const targetTeamId = spec.teamId || null;
    const category = getCategory(categoryId, categoryList);
    const specificSku = isKnownSku(sku, categoryList);
    const categoryRequest = !specificSku && Boolean(category);
    const scored = [];
    teamList.forEach((team) => {
      const direct = sku && team.skus.includes(sku);
      const sameCategory = category && team.skus.some((item) => category.skus.includes(item));
      if (specificSku && !direct) return;
      if (categoryRequest && !sameCategory) return;
      if (!specificSku && !categoryRequest && team.id !== targetTeamId) return;
      const responseHours = Number.parseInt(team.avgResponse, 10) || 24;
      let score = (direct ? 58 : 36) + Math.round((team.rating || 0) * 5) + Math.min(10, Math.round((team.volume || 0) / 8)) + Math.max(0, 6 - Math.min(responseHours, 6));
      if (team.tags && team.tags.includes("verified")) score += 4;
      if (team.id === targetTeamId) score += 6;
      score = Math.min(99, score);
      const reasonParts = [];
      const relevanceEvidence = [];
      const serviceEvidence = [];
      const pendingEvidence = [];
      const skuKey = String(sku || "").slice(0, 4);
      const hasRelatedCase = direct && team.cases && team.cases.some((group) => {
        if (String(group.dir || "").includes(skuKey)) return true;
        return (group.items || []).some((item) => String(item).includes(skuKey));
      });
      if (direct) {
        relevanceEvidence.push({ label: "\u670D\u52A1\u8303\u56F4", text: `\u53EF\u627F\u63A5\u201C${sku}\u201D` });
      } else if (sameCategory) {
        relevanceEvidence.push({ label: "\u670D\u52A1\u65B9\u5411", text: `\u8986\u76D6${team.skus.slice(0, 2).join("\u3001")}\u7B49\u76F8\u5173\u670D\u52A1` });
      }
      if (hasRelatedCase) {
        relevanceEvidence.push({ label: "\u76F8\u5173\u7ECF\u9A8C", text: `\u5177\u6709\u201C${sku}\u201D\u76F8\u5173\u670D\u52A1\u6848\u4F8B` });
      } else if (direct) {
        relevanceEvidence.push({ label: "\u4E13\u4E1A\u80FD\u529B", text: `\u56E2\u961F\u670D\u52A1\u6807\u7B7E\u4E0E\u672C\u6B21\u9700\u6C42\u76F8\u5173` });
      }
      if (team.city && spec.city && team.city === spec.city) {
        relevanceEvidence.push({ label: "\u670D\u52A1\u5730\u533A", text: `\u652F\u6301${team.city}\u672C\u5730\u529E\u7406` });
      } else if (team.city) {
        pendingEvidence.push(`\u56E2\u961F\u4F4D\u4E8E${team.city}\uFF0C\u5F02\u5730\u670D\u52A1\u65B9\u5F0F\u9700\u8FDB\u4E00\u6B65\u786E\u8BA4`);
      }
      if (team.rating) {
        serviceEvidence.push({
          label: "\u7528\u6237\u8BC4\u4EF7",
          text: `${Number(team.rating).toFixed(1)}\u5206${team.reviewCount ? `\uFF0C\u6765\u81EA${team.reviewCount}\u6761\u8BC4\u4EF7` : ""}`
        });
      }
      if (team.completedOrders) {
        serviceEvidence.push({ label: "\u670D\u52A1\u8BB0\u5F55", text: `\u5E73\u53F0\u5DF2\u5B8C\u6210${team.completedOrders}\u5355` });
      }
      if (team.avgResponse) {
        serviceEvidence.push({ label: "\u54CD\u5E94\u6548\u7387", text: `\u901A\u5E38${team.avgResponse}\u5185\u54CD\u5E94` });
      }
      pendingEvidence.push("\u6700\u7EC8\u62A5\u4EF7\u4E0E\u4EA4\u4ED8\u5468\u671F\u9700\u5728\u6C9F\u901A\u540E\u786E\u8BA4");
      if (direct && hasRelatedCase) reasonParts.push(`\u6709${sku}\u76F8\u5173\u6848\u4F8B`);
      else if (direct) reasonParts.push(`\u670D\u52A1\u8303\u56F4\u5305\u542B${sku}`);
      else if (sameCategory) reasonParts.push(`\u8986\u76D6${team.skus.slice(0, 2).join("\u3001")}`);
      if (team.completedOrders) reasonParts.push(`\u5E73\u53F0\u5DF2\u5B8C\u6210${team.completedOrders}\u5355`);
      if (team.city && spec.city && team.city === spec.city) reasonParts.push(`\u652F\u6301${team.city}\u672C\u5730\u529E\u7406`);
      else if (team.avgResponse) reasonParts.push(`\u901A\u5E38${team.avgResponse}\u5185\u54CD\u5E94`);
      scored.push({
        teamId: team.id,
        score,
        reason: `${reasonParts.join("\uFF0C")}\u3002`,
        relevanceEvidence,
        serviceEvidence,
        pendingEvidence
      });
    });
    scored.sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return left.teamId < right.teamId ? -1 : 1;
    });
    const seenOrganizations = {};
    return scored.filter((item) => {
      const team = getTeam(item.teamId, teamList);
      if (!team || seenOrganizations[team.orgId]) return false;
      seenOrganizations[team.orgId] = true;
      return true;
    }).map((item) => ({
      ...item,
      matchLabel: item.score >= 92 ? "\u9AD8\u5EA6\u5339\u914D" : item.score >= 84 ? "\u8F83\u4E3A\u5339\u914D" : "\u53EF\u8FDB\u4E00\u6B65\u4E86\u89E3"
    }));
  }
  function matchLevel(team, demand, categoryList = categories) {
    if (!team) return 0;
    if (demand.sku && team.skus.includes(demand.sku)) return 2;
    const category = getCategory(demand.categoryId, categoryList);
    if (category && category.skus && category.skus.length) {
      if (team.skus.some((sku) => category.skus.includes(sku))) return 1;
    }
    return 0;
  }
  function deriveQuote(team, demand) {
    const budget = demand.budget || "";
    const mode = team && team.priceMode ? team.priceMode : "\u6309\u9879\u76EE\u62A5\u4EF7";
    const numbers = budget.match(/\d+(\.\d+)?/g);
    const drift = 1 + (seed(`${team ? team.id : "t"}|${demand.id}`) % 31 - 15) / 100;
    if (budget.includes("\u4E07") && numbers) {
      let value;
      if (numbers.length >= 2) value = (Number.parseFloat(numbers[0]) + Number.parseFloat(numbers[1])) / 2;
      else if (budget.includes("\u4EE5\u4E0A")) value = Number.parseFloat(numbers[0]) * 1.1;
      else if (budget.includes("\u4EE5\u4E0B")) value = Number.parseFloat(numbers[0]) * 0.8;
      else value = Number.parseFloat(numbers[0]);
      return `${Math.round(value * drift * 10) / 10}\u4E07 \xB7 ${mode}`;
    }
    if (numbers && numbers.length >= 2) {
      const midpoint = Math.round((Number.parseFloat(numbers[0]) + Number.parseFloat(numbers[1])) / 2 * drift / 100) * 100;
      return `${midpoint}\u5143 \xB7 ${mode}`;
    }
    if (team && team.priceText) return `\u53C2\u8003 ${team.priceText} \xB7 ${mode}\uFF0C\u9700\u6C9F\u901A\u540E\u786E\u8BA4`;
    return "\u5F85\u6C9F\u901A\u540E\u786E\u8BA4";
  }
  function buildAcceptRecord(teamId, demand, options = {}) {
    const teamList = options.teams || teams;
    const feedbackPool = options.acceptFeedbackPool || acceptFeedbackPool;
    const materials = options.materialPool || materialPool;
    const team = getTeam(teamId, teamList);
    const value = seed(teamId + demand.id) + (demand.accepted ? demand.accepted.length : 0);
    const feedbacks = feedbackPool[demand.categoryId] || feedbackPool.default;
    const requiredMaterials = materials[demand.sku] || materials.default;
    return {
      teamId,
      time: "\u521A\u521A",
      quote: deriveQuote(team, demand),
      feedback: pick(feedbacks, value),
      needMaterials: requiredMaterials.slice(0, 3)
    };
  }
  function buildRejectRecord(teamId, demand, reasonKey, options = {}) {
    const teamList = options.teams || teams;
    const reasons = options.rejectReasonPool || rejectReasonPool;
    const getTime = options.nowLabel || nowLabel;
    const team = getTeam(teamId, teamList);
    let reason = reasons[reasonKey] || reasons.scope;
    if (reasonKey === "scope" && team && team.skus.length) {
      reason = `\u8BE5\u9700\u6C42\u4E0D\u5728\u672C\u56E2\u961F\u5F53\u524D\u627F\u63A5\u8303\u56F4\u5185\uFF08\u6211\u4EEC\u4E3B\u8981\u627F\u63A5\uFF1A${team.skus.slice(0, 2).join("\u3001")}\uFF09\uFF0C\u5EFA\u8BAE\u9009\u62E9\u66F4\u5BF9\u53E3\u7684\u56E2\u961F\u3002`;
    }
    return { teamId, time: getTime(), reason };
  }
  function decideResponse(teamId, demand, index, total, options = {}) {
    const teamList = options.teams || teams;
    const categoryList = options.categories || categories;
    const team = getTeam(teamId, teamList);
    const level = matchLevel(team, demand, categoryList);
    if (level === 0) return { type: "reject", reasonKey: "scope" };
    if (level < 2 && !isKnownSku(demand.sku, categoryList)) return { type: "reject", reasonKey: "vague" };
    if (total >= 3 && index === total - 1) return { type: "timeout" };
    if (level === 1 && seed(teamId) % 3 === 0) return { type: "reject", reasonKey: "busy" };
    return { type: "accept" };
  }

  // src/domain/lifecycle.js
  function createDemand(input, options = {}) {
    const demandList = options.demands || demands;
    const messages = options.chatMessages || chatMessages;
    const userData = options.user || user;
    const getTime = options.nowLabel || nowLabel;
    const getToday = options.todayLabel || todayLabel;
    const getDeadline = options.responseDeadlineLabel || responseDeadlineLabel;
    let maxNumber = 0;
    demandList.forEach((demand2) => {
      const number2 = Number.parseInt(String(demand2.id).replace(/[^0-9]/g, ""), 10);
      if (!Number.isNaN(number2) && number2 > maxNumber) maxNumber = number2;
    });
    const number = maxNumber + 1;
    const id = `d${number < 10 ? "00" : number < 100 ? "0" : ""}${number}`;
    const teamIds = input.teamIds || [];
    const demand = {
      id,
      title: input.title,
      status: "pending",
      categoryId: input.categoryId,
      categoryName: input.categoryName,
      sku: input.sku,
      budget: input.budget,
      clientType: `${userData.companyType}\xB7${userData.stage}`,
      city: userData.city,
      date: getToday(),
      progress: `\u5DF2\u53D1\u9001\u7ED9 ${teamIds.length} \u5BB6\u56E2\u961F\uFF0C\u7B49\u5F85\u54CD\u5E94`,
      responseDeadline: getDeadline(30),
      totalInvited: teamIds.length,
      responseClosed: false,
      notificationSent: false,
      desc: input.desc,
      fields: input.fields || [],
      accepted: [],
      pending: teamIds.map((teamId) => ({ teamId, sentTime: "\u521A\u521A" })),
      timedOut: [],
      rejected: [],
      timeline: [],
      resubmitFrom: input.resubmitFrom || null,
      sourceDemandId: input.sourceDemandId || null,
      cooperationType: input.cooperationType || "new",
      targetTeamId: input.targetTeamId || null
    };
    demandList.unshift(demand);
    addTimelineEvent(demand, "sent", "\u9700\u6C42\u5DF2\u53D1\u51FA", `\u5DF2\u53D1\u9001\u7ED9 ${teamIds.length} \u5BB6\u670D\u52A1\u56E2\u961F`, getTime);
    messages[id] = {};
    return demand;
  }
  function startCommunication(demand, teamId, options = {}) {
    if (!demand || !(demand.accepted || []).some((record) => record.teamId === teamId)) return false;
    const getTime = options.nowLabel || nowLabel;
    demand.candidateTeam = teamId;
    if (demand.status === "choosing") {
      demand.status = "communicating";
      demand.progress = "\u5E73\u53F0\u52A9\u624B\u6B63\u5728\u534F\u52A9\u786E\u8BA4\u670D\u52A1\u65B9\u6848";
      addTimelineEvent(demand, "message", "\u5F00\u59CB\u786E\u8BA4\u670D\u52A1\u65B9\u6848", "\u57FA\u7840\u4FE1\u606F\u7531\u5E73\u53F0\u52A9\u624B\u6574\u7406\u5E76\u540C\u6B65", getTime);
    }
    if (!demand.planDrafts) demand.planDrafts = {};
    if (!demand.planDrafts[teamId]) demand.planDrafts[teamId] = buildServicePlan(demand, teamId, options);
    return true;
  }
  function getOrCreateDirectConsultation(teamId, sku, options = {}) {
    const demandList = options.demands || demands;
    const teamList = options.teams || teams;
    const categoryList = options.categories || categories;
    const messages = options.chatMessages || chatMessages;
    const userData = options.user || user;
    const getTime = options.nowLabel || nowLabel;
    const existing = demandList.find((item) => item.directInquiry && item.targetTeamId === teamId && item.sku === sku && !["done", "cancelled"].includes(item.status));
    if (existing) return existing;
    const team = getTeam(teamId, teamList);
    const category = getCategoryForSku(sku, categoryList) || getCategoryForTeam(team, categoryList);
    const demand = createDemand({
      title: `${sku}\u670D\u52A1\u54A8\u8BE2`,
      categoryId: category ? category.id : "law",
      categoryName: category ? category.name : "\u4F01\u4E1A\u670D\u52A1",
      sku,
      budget: "\u6C9F\u901A\u540E\u786E\u8BA4",
      desc: `${userData.company}\u6B63\u5728\u5411${team.name}\u54A8\u8BE2${sku}\u670D\u52A1\u3002`,
      fields: [
        { label: "\u670D\u52A1\u7C7B\u578B", value: sku },
        { label: "\u610F\u5411\u56E2\u961F", value: team.name },
        { label: "\u9884\u7B97\u8303\u56F4", value: "\u6C9F\u901A\u540E\u786E\u8BA4" },
        { label: "\u671F\u671B\u5B8C\u6210\u65F6\u95F4", value: "\u53CC\u65B9\u6C9F\u901A\u540E\u786E\u8BA4" },
        { label: "\u5B9E\u9645\u529E\u516C\u57CE\u5E02", value: `${userData.city}\xB7${userData.district}` }
      ],
      teamIds: [teamId],
      targetTeamId: teamId
    }, options);
    demand.directInquiry = true;
    demand.requirementConfirmed = false;
    demand.status = "communicating";
    demand.progress = `\u6B63\u5728\u901A\u8FC7\u5E73\u53F0\u52A9\u624B\u5411${team.name}\u786E\u8BA4\u9700\u6C42`;
    demand.pending = [];
    demand.accepted = [buildAcceptRecord(teamId, demand, { ...options, teams: teamList, materialPool: options.materialPool || materialPool })];
    demand.responseClosed = true;
    demand.totalInvited = 1;
    demand.timeline = [];
    addTimelineEvent(demand, "message", `\u5DF2\u4E0E${team.name}\u5EFA\u7ACB\u8054\u7CFB`, `\u54A8\u8BE2\u670D\u52A1\uFF1A${sku}`, getTime);
    appendChatMessage(demand.id, teamId, { type: "system", text: `\u5DF2\u8FDB\u5165${team.name}\u7684\u9700\u6C42\u786E\u8BA4\u6D41\u7A0B\uFF0C\u672C\u6B21\u54A8\u8BE2\u670D\u52A1\u4E3A\u201C${sku}\u201D\u3002\u5E73\u53F0\u52A9\u624B\u4F1A\u6574\u7406\u5E76\u540C\u6B65\u57FA\u7840\u4FE1\u606F\u3002` }, messages);
    return demand;
  }
  function confirmDirectRequirement(demand, teamId, options = {}) {
    if (!demand || !demand.directInquiry || demand.requirementConfirmed) return false;
    const teamList = options.teams || teams;
    const messages = options.chatMessages || chatMessages;
    const getTime = options.nowLabel || nowLabel;
    demand.requirementConfirmed = true;
    demand.requirementConfirmedAt = getTime();
    appendChatMessage(demand.id, teamId, { type: "system", text: "\u670D\u52A1\u9700\u6C42\u5DF2\u786E\u8BA4\u5E76\u540C\u6B65\u7ED9\u670D\u52A1\u56E2\u961F\u3002" }, messages);
    addTimelineEvent(demand, "check", "\u670D\u52A1\u9700\u6C42\u5DF2\u786E\u8BA4", `\u5DF2\u540C\u6B65\u7ED9${(getTeam(teamId, teamList) || {}).name}`, getTime);
    return true;
  }
  function replaceDemandTeamBatch(demand, options = {}) {
    if (!demand) return [];
    const getTime = options.nowLabel || nowLabel;
    const getDeadline = options.responseDeadlineLabel || responseDeadlineLabel;
    const used = {};
    (demand.accepted || []).concat(demand.pending || [], demand.timedOut || [], demand.rejected || []).forEach((item) => {
      used[item.teamId] = true;
    });
    const candidates = getMatchResults({ sku: demand.sku, categoryId: demand.categoryId, city: demand.city }, options).filter((item) => !used[item.teamId]).slice(0, 3);
    demand.pending = candidates.map((item) => ({ teamId: item.teamId, sentTime: "\u521A\u521A" }));
    demand.totalInvited = (demand.totalInvited || 0) + candidates.length;
    demand.responseClosed = false;
    demand.waitedOverHour = false;
    demand.responseDeadline = getDeadline(60);
    demand._simulated = false;
    demand.status = "pending";
    demand.progress = candidates.length ? "\u5DF2\u66F4\u6362\u4E00\u6279\u56E2\u961F\uFF0C\u6B63\u5728\u7B49\u5F85\u54CD\u5E94" : "\u6682\u65E0\u66F4\u591A\u5408\u9002\u56E2\u961F\uFF0C\u5E73\u53F0\u5C06\u7EE7\u7EED\u8BC4\u4F30";
    addTimelineEvent(demand, "refresh", "\u5DF2\u66F4\u6362\u670D\u52A1\u56E2\u961F", candidates.length ? "\u539F\u9700\u6C42\u5DF2\u53D1\u9001\u7ED9\u65B0\u7684\u670D\u52A1\u56E2\u961F\uFF0C\u65E0\u9700\u91CD\u65B0\u586B\u5199" : "\u5F53\u524D\u6682\u65E0\u66F4\u591A\u7B26\u5408\u6761\u4EF6\u7684\u56E2\u961F", getTime);
    return candidates;
  }
  function simulateResponses(demandId, onUpdate, options = {}) {
    const demandList = options.demands || demands;
    const teamList = options.teams || teams;
    const schedule = options.setTimeout || globalThis.setTimeout;
    const getTime = options.nowLabel || nowLabel;
    const demand = getDemand(demandId, demandList);
    if (!demand || demand._simulated) return;
    demand._simulated = true;
    const queue = (demand.pending || []).map((pending) => pending.teamId);
    const total = queue.length;
    if (!total) return;
    queue.forEach((teamId, index) => {
      const delay = 2600 + index * 2600;
      schedule(() => {
        const current = getDemand(demandId, demandList);
        if (!current || current.status === "cancelled") return;
        if (["contract_pending", "active", "acceptance", "done"].includes(current.status)) return;
        const team = getTeam(teamId, teamList);
        const decision = decideResponse(teamId, current, index, total, options);
        if (decision.type === "timeout") {
          current.pending = (current.pending || []).filter((pending) => pending.teamId !== teamId);
          if (!current.timedOut) current.timedOut = [];
          current.timedOut.push({ teamId, time: getTime() });
          addTimelineEvent(current, "clock", `${team ? team.name : "\u670D\u52A1\u56E2\u961F"} \u672A\u5728\u65F6\u9650\u5185\u54CD\u5E94`, "\u53EF\u7EE7\u7EED\u9009\u62E9\u5176\u4ED6\u5DF2\u54CD\u5E94\u56E2\u961F", getTime);
        } else {
          current.pending = (current.pending || []).filter((pending) => pending.teamId !== teamId);
          if (decision.type === "accept") {
            current.accepted.push(buildAcceptRecord(teamId, current, options));
            addTimelineEvent(current, "accept", `${team ? team.name : "\u670D\u52A1\u56E2\u961F"} \u5DF2\u54CD\u5E94`, `\u62A5\u4EF7\u610F\u5411 ${current.accepted[current.accepted.length - 1].quote}`, getTime);
          } else {
            const record = buildRejectRecord(teamId, current, decision.reasonKey, { ...options, nowLabel: getTime });
            current.rejected.push(record);
            addTimelineEvent(current, "reject", `${team ? team.name : "\u670D\u52A1\u56E2\u961F"} \u6682\u672A\u627F\u63A5`, record.reason, getTime);
          }
        }
        refreshDemandStatus(current, (target, kind, title, desc) => addTimelineEvent(target, kind, title, desc, getTime));
        if (!(current.pending || []).length) closeResponseRound(current, options);
        if (typeof onUpdate === "function") onUpdate(current, decision, team);
      }, delay);
    });
  }
  function closeResponseRound(demand, options = {}) {
    if (!demand || demand.responseClosed || ["contract_pending", "active", "acceptance", "done"].includes(demand.status)) return;
    const getTime = options.nowLabel || nowLabel;
    const wecomStatus = options.isWecomAdded || isWecomAdded;
    demand.responseClosed = true;
    if (demand.notificationSent) return;
    demand.notificationSent = true;
    const count = (demand.accepted || []).length;
    const channel = wecomStatus() ? "\u4F01\u4E1A\u5FAE\u4FE1" : "\u77ED\u4FE1\u548C\u9700\u6C42\u52A8\u6001";
    const desc = count > 0 ? `\u5DF2\u6709 ${count} \u5BB6\u56E2\u961F\u54CD\u5E94\uFF0C\u8BF7\u9009\u62E9\u5408\u9002\u7684\u56E2\u961F\u7EE7\u7EED\u786E\u8BA4\u670D\u52A1\u4FE1\u606F` : "\u6682\u672A\u6536\u5230\u56E2\u961F\u54CD\u5E94\uFF0C\u53EF\u4EE5\u5728\u9700\u6C42\u8BE6\u60C5\u4E2D\u66F4\u6362\u4E00\u6279\u56E2\u961F";
    addTimelineEvent(demand, "bell", `\u5DF2\u901A\u8FC7${channel}\u53D1\u9001\u8FDB\u5EA6\u901A\u77E5`, desc, getTime);
  }

  // src/demo/scenarios/shared.js
  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }
  function cloneBaseline(baseline) {
    return {
      demands: clone(baseline.demands),
      teams: clone(baseline.teams),
      chatMessages: clone(baseline.chatMessages)
    };
  }
  function singleDemandScenario(baseline, demandId) {
    const result = cloneBaseline(baseline);
    const demand = result.demands.find((item) => item.id === demandId);
    result.demands = demand ? [demand] : [];
    return { result, demand: demand || null };
  }
  function domainOptions(result) {
    return {
      demands: result.demands,
      teams: result.teams,
      chatMessages: result.chatMessages,
      user,
      materialPool,
      nowLabel,
      startCommunication,
      createAgreementForDemand
    };
  }
  function submitPlan(result, demand, teamId = "t001") {
    return submitServicePlan(demand, teamId, domainOptions(result));
  }
  function updatePlan(result, demand, teamId = "t001") {
    return providerUpdateServicePlan(demand, teamId, domainOptions(result));
  }
  function confirmPlan(result, demand, teamId = "t001") {
    return confirmServicePlan(demand, teamId, domainOptions(result));
  }
  function changeAgreementStatus(result, demand, status) {
    return setAgreementStatus(demand, status, domainOptions(result));
  }
  function preparePlanDraftScenario(baseline) {
    const { result, demand } = singleDemandScenario(baseline, "d001");
    if (!demand) return { result, demand };
    demand.status = "plan_pending";
    demand.candidateTeam = "t001";
    demand.planDrafts = {};
    return { result, demand };
  }

  // src/demo/scenarios/acceptance.js
  function acceptanceScenario(baseline) {
    const { result, demand } = singleDemandScenario(baseline, "d002");
    if (!demand) return result;
    demand.status = "acceptance";
    demand.progress = "\u670D\u52A1\u56E2\u961F\u5DF2\u63D0\u4EA4\u6210\u679C\uFF0C\u7B49\u5F85\u4F60\u9A8C\u6536";
    demand.delivery = {
      summary: "\u80A1\u6743\u7ED3\u6784\u65B9\u6848\u53CA\u914D\u5957\u6587\u4EF6\u5DF2\u5168\u90E8\u63D0\u4EA4",
      files: ["\u80A1\u6743\u7ED3\u6784\u65B9\u6848.pdf", "\u5408\u4F19\u4EBA\u534F\u8BAE\u4FEE\u8BA2\u7A3F.docx"],
      submittedAt: "\u4ECA\u5929 16:20"
    };
    return result;
  }

  // src/demo/scenarios/active.js
  function activeScenario(baseline) {
    return singleDemandScenario(baseline, "d002").result;
  }

  // src/demo/scenarios/cancelled.js
  function cancelledScenario(baseline) {
    return singleDemandScenario(baseline, "d004").result;
  }

  // src/demo/scenarios/choosing.js
  function choosingScenario(baseline) {
    return singleDemandScenario(baseline, "d001").result;
  }

  // src/demo/scenarios/communicating.js
  function communicatingScenario(baseline) {
    const { result, demand } = singleDemandScenario(baseline, "d001");
    if (!demand) return result;
    demand.status = "communicating";
    demand.candidateTeam = "t001";
    demand.progress = "\u6B63\u5728\u4E0E\u660E\u6CD5\u5F8B\u5E08\u56E2\u961F\u6C9F\u901A\u65B9\u6848";
    return result;
  }

  // src/demo/scenarios/contract_customer.js
  function contractCustomerScenario(baseline) {
    const { result, demand } = preparePlanDraftScenario(baseline);
    if (!demand) return result;
    submitPlan(result, demand);
    confirmPlan(result, demand);
    return result;
  }

  // src/demo/scenarios/contract_provider.js
  function contractProviderScenario(baseline) {
    const { result, demand } = preparePlanDraftScenario(baseline);
    if (!demand) return result;
    submitPlan(result, demand);
    confirmPlan(result, demand);
    changeAgreementStatus(result, demand, "provider_signing");
    return result;
  }

  // src/demo/scenarios/contract_review.js
  function contractReviewScenario(baseline) {
    const { result, demand } = preparePlanDraftScenario(baseline);
    if (!demand) return result;
    submitPlan(result, demand);
    confirmPlan(result, demand);
    changeAgreementStatus(result, demand, "auditing");
    return result;
  }

  // src/demo/scenarios/done_pending_review.js
  function donePendingReviewScenario(baseline) {
    return singleDemandScenario(baseline, "d003").result;
  }

  // src/demo/scenarios/done_reviewed.js
  function doneReviewedScenario(baseline) {
    const { result, demand } = singleDemandScenario(baseline, "d003");
    if (!demand) return result;
    demand.hasReview = true;
    demand.progress = "\u5DF2\u5B8C\u6210\xB7\u5DF2\u8BC4\u4EF7";
    demand.reviewRating = 4.8;
    demand.reviewDimensions = { professional: 5, response: 5, communication: 4, delivery: 5 };
    demand.reviewText = "\u6C9F\u901A\u6E05\u695A\uFF0C\u6750\u6599\u6E05\u5355\u51C6\u786E\uFF0C\u91CD\u8981\u8282\u70B9\u90FD\u4F1A\u63D0\u524D\u63D0\u9192\u3002";
    demand.reviewDate = "2026-08-13";
    return result;
  }

  // src/demo/scenarios/new.js
  function newScenario(baseline) {
    const result = cloneBaseline(baseline);
    result.demands = [];
    return result;
  }

  // src/demo/scenarios/pending.js
  function pendingScenario(baseline) {
    const { result, demand } = singleDemandScenario(baseline, "d001");
    if (!demand) return result;
    demand.status = "pending";
    demand.progress = "\u5DF2\u9080\u8BF7 4 \u5BB6\u56E2\u961F\uFF0C\u6B63\u5728\u7B49\u5F85\u54CD\u5E94";
    demand.responseClosed = false;
    demand.responseDeadline = "\u4ECA\u5929 18:00 \u524D";
    demand.pending = [
      { teamId: "t001", sentTime: "\u4ECA\u5929 09:20" },
      { teamId: "t002", sentTime: "\u4ECA\u5929 09:20" },
      { teamId: "t004", sentTime: "\u4ECA\u5929 09:20" },
      { teamId: "t007", sentTime: "\u4ECA\u5929 09:20" }
    ];
    demand.accepted = [];
    demand.timedOut = [];
    demand.timeline = [demand.timeline[0]];
    return result;
  }

  // src/demo/scenarios/plan_pending.js
  function planPendingScenario(baseline) {
    const { result, demand } = singleDemandScenario(baseline, "d001");
    if (!demand) return result;
    demand.status = "plan_pending";
    demand.candidateTeam = "t001";
    demand.progress = "\u660E\u6CD5\u5F8B\u5E08\u56E2\u961F\u5DF2\u63D0\u4EA4\u670D\u52A1\u65B9\u6848\uFF0C\u7B49\u5F85\u786E\u8BA4";
    demand.servicePlan = {
      teamId: "t001",
      version: 1,
      status: "pending",
      scope: "\u5B8C\u6210\u878D\u8D44\u4EA4\u6613\u7ED3\u6784\u8BBE\u8BA1\u3001\u6CD5\u5F8B\u5C3D\u8C03\u3001\u4EA4\u6613\u6587\u4EF6\u8D77\u8349\u4E0E\u8C08\u5224\u652F\u6301",
      finalQuote: "4\u4E07",
      period: "4\u5468",
      deliverables: ["\u5C3D\u8C03\u95EE\u9898\u6E05\u5355", "\u6295\u8D44\u534F\u8BAE\u53CA\u914D\u5957\u6587\u4EF6", "\u4EA4\u5272\u6587\u4EF6\u5305"],
      exclusions: ["\u4E13\u9879\u7A0E\u52A1\u610F\u89C1", "\u5883\u5916\u4E3B\u4F53\u6CD5\u5F8B\u610F\u89C1"],
      materials: ["\u73B0\u6709\u80A1\u6743\u7ED3\u6784\u8868", "\u6295\u8D44\u610F\u5411\u4E66\u6216TS\u8349\u7A3F"],
      submittedAt: "\u4ECA\u5929 14:20"
    };
    submitPlan(result, demand);
    return result;
  }

  // src/demo/scenarios/plan_updated.js
  function planUpdatedScenario(baseline) {
    const { result, demand } = preparePlanDraftScenario(baseline);
    if (!demand) return result;
    submitPlan(result, demand);
    updatePlan(result, demand);
    return result;
  }

  // src/demo/scenarios/timeout.js
  function timeoutScenario(baseline) {
    const { result, demand } = singleDemandScenario(baseline, "d001");
    if (!demand) return result;
    demand.status = "pending";
    demand.progress = "\u8D85\u8FC71\u5C0F\u65F6\u6682\u65E0\u56E2\u961F\u54CD\u5E94";
    demand.responseClosed = true;
    demand.waitedOverHour = true;
    demand.responseDeadline = "\u672C\u8F6E\u54CD\u5E94\u5DF2\u8D85\u65F6";
    demand.accepted = [];
    demand.pending = [];
    demand.rejected = [];
    demand.timedOut = [
      { teamId: "t001", time: "\u4ECA\u5929 10:20" },
      { teamId: "t002", time: "\u4ECA\u5929 10:20" },
      { teamId: "t004", time: "\u4ECA\u5929 10:20" }
    ];
    demand.totalInvited = 3;
    demand.timeline = [{ kind: "sent", title: "\u9700\u6C42\u5DF2\u53D1\u51FA", desc: "\u5DF2\u53D1\u9001\u7ED9 3 \u5BB6\u670D\u52A1\u56E2\u961F", time: "\u4ECA\u5929 09:20" }];
    return result;
  }

  // src/demo/scenarios/registry.js
  var scenarioLabels = Object.freeze({
    new: "\u65B0\u7528\u6237",
    pending: "\u7B49\u5F85\u54CD\u5E94",
    timeout: "\u7B49\u5F85\u8D85\u65F6",
    choosing: "\u9009\u62E9\u56E2\u961F",
    communicating: "\u65B9\u6848\u6C9F\u901A",
    plan_pending: "\u5F85\u786E\u8BA4\u65B9\u6848",
    plan_updated: "\u65B9\u6848\u5DF2\u66F4\u65B0",
    contract_customer: "\u5F85\u5BA2\u6237\u7B7E\u7EA6",
    contract_provider: "\u5F85\u670D\u52A1\u5546\u7528\u5370",
    contract_review: "\u534F\u8BAE\u5BA1\u6838\u4E2D",
    active: "\u670D\u52A1\u8FDB\u884C\u4E2D",
    acceptance: "\u5F85\u9A8C\u6536",
    done_pending_review: "\u5DF2\u5B8C\u6210\xB7\u5F85\u8BC4\u4EF7",
    done_reviewed: "\u5DF2\u5B8C\u6210\xB7\u5DF2\u8BC4\u4EF7",
    cancelled: "\u672C\u8F6E\u5DF2\u7ED3\u675F"
  });
  var scenarios = Object.freeze({
    new: newScenario,
    pending: pendingScenario,
    timeout: timeoutScenario,
    choosing: choosingScenario,
    communicating: communicatingScenario,
    plan_pending: planPendingScenario,
    plan_updated: planUpdatedScenario,
    contract_customer: contractCustomerScenario,
    contract_provider: contractProviderScenario,
    contract_review: contractReviewScenario,
    active: activeScenario,
    acceptance: acceptanceScenario,
    done_pending_review: donePendingReviewScenario,
    done_reviewed: doneReviewedScenario,
    cancelled: cancelledScenario
  });
  function createScenario(scene, baseline) {
    const factory = scenarios[scene];
    return factory ? factory(baseline) : cloneBaseline(baseline);
  }

  // src/demo/panel.js
  function captureBaseline() {
    return JSON.parse(JSON.stringify({
      demands: store.demands,
      teams: store.teams,
      chatMessages: store.chatMessages
    }));
  }
  function replaceRuntimeData(result) {
    store.teams = result.teams;
    store.chatMessages = result.chatMessages;
    store.demands = result.demands;
  }
  function updatePanelState(scene) {
    document.querySelectorAll("[data-demo-scene]").forEach((button) => {
      const active = button.getAttribute("data-demo-scene") === scene;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    const state2 = document.getElementById("demoControlState");
    if (state2) state2.textContent = `\u5F53\u524D\uFF1A${scenarioLabels[scene] || "\u9ED8\u8BA4\u6570\u636E"}`;
  }
  function setInitialDemoScenario(scene) {
    if (!this.demoBaseline) return;
    resetFundraisingState();
    replaceRuntimeData(createScenario(scene, this.demoBaseline));
    this.demoScenario = scene;
    updatePanelState(scene);
  }
  function initDemoControls() {
    const panel = document.getElementById("demoControlPanel");
    if (!panel) return;
    this.demoBaseline = captureBaseline();
    const host = this;
    panel.querySelectorAll("[data-demo-scene]").forEach((button) => {
      button.addEventListener("click", function() {
        host.applyDemoScenario(this.getAttribute("data-demo-scene"));
      });
    });
    panel.querySelectorAll("[data-demo-action]").forEach((button) => {
      button.addEventListener("click", function() {
        const action = this.getAttribute("data-demo-action");
        if (action === "onboarding") {
          try {
            localStorage.removeItem(ecologyOnboarding.storageKey);
          } catch (error) {
          }
          host.closeAllModals();
          host.switchTab("ecology");
        } else if (action === "wecom") {
          try {
            localStorage.removeItem("ecologyWecomAdded");
          } catch (error) {
          }
          host.closeAllModals();
          openWecomGuide("demo");
        } else if (action === "fundraising-waiting" || action === "fundraising-matched") {
          const matched = action === "fundraising-matched";
          setFundraisingDemo(matched ? "matched" : "waiting");
          host.closeAllModals();
          host.switchTab("ecology");
          navigateTo("p12", { stage: matched ? "results" : "progress" });
        }
      });
    });
    document.getElementById("demoResetButton").addEventListener("click", () => {
      resetFundraisingState();
      host.applyDemoScenario(null);
    });
  }
  function applyDemoScenario(scene) {
    if (!this.demoBaseline) return;
    resetFundraisingState();
    replaceRuntimeData(createScenario(scene, this.demoBaseline));
    this.demoScenario = scene;
    updatePanelState(scene);
    this.closeAllModals();
    this.switchTab("ecology");
    this.toast(scene ? `\u5DF2\u5207\u6362\u81F3\u201C${scenarioLabels[scene]}\u201D\u573A\u666F` : "\u5DF2\u6062\u590D\u9ED8\u8BA4\u6570\u636E");
  }

  // src/core/shell.js
  function bindTabBar() {
    const app2 = this;
    document.querySelectorAll(".tab-item").forEach((item) => {
      item.addEventListener("click", function() {
        app2.switchTab(this.getAttribute("data-tab"));
      });
    });
  }
  function switchTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll(".tab-item").forEach((item) => {
      item.classList.toggle("active", item.getAttribute("data-tab") === tab);
    });
    this.pageStack.length = 0;
    this.showTabBar(true);
    if (tab === "home") this.renderHome();
    else if (tab === "ecology") {
      this.pageStack.push({ pageId: "p1", params: {} });
      this.renderPage("p1", {});
      this.showTabBar(true);
    } else if (tab === "activity") this.renderActivity();
    else if (tab === "mine") this.renderMine();
  }
  function showTabBar(show) {
    const tabBar = document.getElementById("tabBar");
    if (tabBar) tabBar.classList.toggle("hidden", !show);
  }
  function clearPageAction() {
    const slot = document.getElementById("pageActionBar");
    if (!slot) return;
    slot.innerHTML = "";
    slot.classList.add("hidden");
  }
  function mountPageAction() {
    const container = document.getElementById("page-container");
    const slot = document.getElementById("pageActionBar");
    if (!container || !slot) return;
    const action = container.querySelector(".bottom-bar, .p2-bottom-match");
    if (!action) return;
    slot.appendChild(action);
    slot.classList.remove("hidden");
  }
  function setPageContent(html, pageId) {
    const container = document.getElementById("page-container");
    this.clearPageAction();
    container.innerHTML = html;
    if (pageId) container.setAttribute("data-page", pageId);
    this.mountPageAction();
    return container;
  }
  function scrollPageToTop() {
    document.getElementById("page-container").scrollTop = 0;
  }
  function updateBadge() {
    const pendingDemands = getTodoDemands(store.demands);
    const badge = document.getElementById("tabBadge");
    if (!badge) return;
    if (pendingDemands.length > 0) {
      badge.textContent = pendingDemands.length;
      badge.style.display = "flex";
    } else {
      badge.style.display = "none";
    }
  }
  function renderHome() {
    this.showTabBar(true);
    const html = '<div class="home-placeholder"><div class="home-placeholder-icon">' + this.icon("home", 56) + '</div><div class="empty-title">\u9996\u9875</div><div class="empty-desc">\u5E73\u53F0\u9996\u9875\u529F\u80FD\u89C4\u5212\u4E2D</div><div style="margin-top:24px"><button class="btn btn-primary" id="homeEcologyButton" type="button">\u8FDB\u5165\u751F\u6001\u9891\u9053</button></div></div>';
    this.setPageContent(html, "home");
    document.getElementById("homeEcologyButton").addEventListener("click", () => this.switchTab("ecology"));
    this.updateBadge();
  }
  function renderActivity() {
    this.showTabBar(true);
    const html = '<div class="activity-placeholder"><div class="activity-placeholder-icon">' + this.icon("calendar", 56) + '</div><div class="activity-placeholder-title">\u6D3B\u52A8</div><div class="activity-placeholder-desc">\u5E73\u53F0\u6D3B\u52A8\u529F\u80FD\u5373\u5C06\u4E0A\u7EBF</div></div>';
    this.setPageContent(html, "activity");
    this.updateBadge();
  }
  function renderMine() {
    this.showTabBar(true);
    const pendingCount = getTodoDemands(store.demands).length;
    const totalDemands = store.demands.length;
    const html = '<div class="mine-header"><div class="mine-avatar">' + user.avatar + '</div><div class="mine-name">' + user.name + '</div><div style="font-size:var(--font-sm);opacity:0.8;margin-top:4px">' + user.company + " \xB7 " + user.companyType + '</div></div><div class="mine-demand-entry" id="mineDemandEntry"><div class="mine-demand-icon">' + this.icon("file-text", 22) + '</div><div class="mine-demand-info"><div class="mine-demand-title">\u6211\u7684\u9700\u6C42</div><div class="mine-demand-meta">' + (totalDemands > 0 ? totalDemands + " \u4E2A" + (pendingCount > 0 ? " \xB7 " + pendingCount + " \u5F85\u5904\u7406" : "") : "\u6682\u65E0\u9700\u6C42") + '</div></div><div class="info-arrow">' + this.icon("chevron-right", 16) + "</div>" + (pendingCount > 0 ? '<span class="badge-dot"></span>' : "") + '</div><div class="mine-menu"><div class="info-row" data-mine-unavailable><div class="info-label">\u4F01\u4E1A\u4FE1\u606F</div><div class="info-value">\u5DF2\u5B8C\u5584</div><div class="info-arrow">' + this.icon("chevron-right", 16) + '</div></div><div class="info-row" data-mine-unavailable><div class="info-label">\u5151\u6362\u4E2D\u5FC3</div><div class="info-arrow">' + this.icon("chevron-right", 16) + '</div></div><div class="info-row" data-mine-unavailable><div class="info-label">\u6D88\u606F\u901A\u77E5</div><div class="info-arrow">' + this.icon("chevron-right", 16) + '</div></div><div class="info-row" data-mine-unavailable><div class="info-label">\u8BBE\u7F6E</div><div class="info-arrow">' + this.icon("chevron-right", 16) + '</div></div><div class="info-row" data-mine-unavailable><div class="info-label">\u5E2E\u52A9\u4E0E\u53CD\u9988</div><div class="info-arrow">' + this.icon("chevron-right", 16) + '</div></div></div><div style="text-align:center;padding:16px;font-size:var(--font-sm);color:var(--color-text-4)">\u751F\u6001\u670D\u52A1\u5E73\u53F0 v1.0 \xB7 Demo</div>';
    this.setPageContent(html, "mine");
    document.getElementById("mineDemandEntry").addEventListener("click", () => navigateTo("p9", {}));
    document.querySelectorAll("[data-mine-unavailable]").forEach((row) => {
      row.addEventListener("click", () => this.toast("\u529F\u80FD\u5F00\u53D1\u4E2D"));
    });
    this.updateBadge();
  }

  // src/services/favorites.js
  function getFavoriteTeamIds() {
    return readJSON(STORAGE_KEYS.favorites, []);
  }
  function isFavoriteTeam(teamId) {
    return getFavoriteTeamIds().includes(teamId);
  }
  function toggleFavoriteTeam(teamId) {
    const ids = getFavoriteTeamIds();
    const index = ids.indexOf(teamId);
    if (index >= 0) ids.splice(index, 1);
    else ids.unshift(teamId);
    writeJSON(STORAGE_KEYS.favorites, ids);
    return ids.includes(teamId);
  }
  function getFavoriteTeams(teamList = teams) {
    return getFavoriteTeamIds().map((id) => getTeam(id, teamList)).filter(Boolean);
  }

  // src/components/favoriteSheet.js
  var ui2 = {
    iconPaths,
    iconFilled,
    icon(name, size) {
      return icon.call(ui2, name, size);
    }
  };
  function openFavorites() {
    const teams2 = getFavoriteTeams(store.teams);
    let body = '<div class="favorite-team-list">';
    if (!teams2.length) {
      body += '<div class="favorite-team-empty">' + ui2.icon("star", 36) + "<strong>\u8FD8\u6CA1\u6709\u6536\u85CF\u56E2\u961F</strong><span>\u6D4F\u89C8\u56E2\u961F\u8BE6\u60C5\u65F6\u53EF\u4EE5\u70B9\u51FB\u53F3\u4E0A\u89D2\u201C\u6536\u85CF\u201D\u3002</span></div>";
    } else {
      teams2.forEach((team) => {
        body += '<button class="favorite-team-row" type="button" data-favorite-team="' + team.id + '"><span class="avatar avatar-sm" style="background:' + (team.avatarColor || "#3A6DF0") + "20;color:" + (team.avatarColor || "#3A6DF0") + '">' + team.avatar + '</span><span class="favorite-team-copy"><strong>' + team.name + "</strong><small>" + team.orgShort + " \xB7 " + team.skus.slice(0, 2).join("\u3001") + "</small></span>" + ui2.icon("chevron-right", 16) + "</button>";
      });
    }
    body += "</div>";
    const overlay = showSheet.call(ui2, { title: "\u6536\u85CF\u7684\u56E2\u961F", body });
    overlay.querySelectorAll("[data-favorite-team]").forEach((row) => {
      row.addEventListener("click", function() {
        const teamId = this.getAttribute("data-favorite-team");
        closeAllModals();
        navigateTo("p3", { teamId });
      });
    });
  }

  // src/services/suggestions.js
  function submitServiceSuggestion(serviceName, scenario, notify, nowLabel2, suggestions = serviceSuggestions, userData = user) {
    const item = {
      id: `SG${String(suggestions.length + 1).padStart(3, "0")}`,
      serviceName,
      scenario: scenario || "",
      notify: Boolean(notify),
      company: userData.company,
      status: "\u5F85\u8BC4\u4F30",
      createdAt: nowLabel2()
    };
    suggestions.unshift(item);
    writeJSON(STORAGE_KEYS.suggestions, suggestions);
    return item;
  }

  // src/ui/dom.js
  function escapeHTML(text) {
    return String(text || "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  // src/components/serviceSuggestion.js
  var ui3 = {
    iconPaths,
    iconFilled,
    icon(name, size) {
      return icon.call(ui3, name, size);
    }
  };
  function openServiceSuggestion(prefill) {
    const body = '<div class="service-suggestion-form"><label><span>\u670D\u52A1\u540D\u79F0\u6216\u65B9\u5411<b>*</b></span><input id="serviceSuggestionName" maxlength="40" value="' + escapeHTML(prefill) + '" placeholder="\u4F8B\u5982\uFF1A\u5458\u5DE5\u80A1\u6743\u6FC0\u52B1\u7A0E\u52A1\u7B79\u5212"></label><label><span>\u5177\u4F53\u9700\u8981\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898<b>*</b></span><textarea id="serviceSuggestionScenario" maxlength="160" placeholder="\u7B80\u5355\u63CF\u8FF0\u4F60\u7684\u60C5\u51B5\u548C\u9700\u8981\u7684\u5E2E\u52A9"></textarea></label><p class="service-suggestion-note">\u5EFA\u8BAE\u5C06\u8FDB\u5165\u5E73\u53F0\u670D\u52A1\u7C7B\u76EE\u8BC4\u4F30\uFF0C\u4E0D\u4EE3\u8868\u5373\u65F6\u54CD\u5E94\u3002</p><button class="btn btn-primary btn-block" id="serviceSuggestionSubmit" type="button">\u63D0\u4EA4\u5EFA\u8BAE</button></div>';
    const overlay = showSheet.call(ui3, { title: "\u5EFA\u8BAE\u65B0\u589E\u4EC0\u4E48\u670D\u52A1\uFF1F", body });
    const input = overlay.querySelector("#serviceSuggestionName");
    overlay.querySelector("#serviceSuggestionSubmit").addEventListener("click", () => {
      const value = input.value.trim();
      if (!value) {
        toast("\u8BF7\u586B\u5199\u5E0C\u671B\u589E\u52A0\u7684\u670D\u52A1");
        input.focus();
        return;
      }
      const scenario = overlay.querySelector("#serviceSuggestionScenario");
      if (!scenario.value.trim()) {
        toast("\u8BF7\u7B80\u5355\u63CF\u8FF0\u9700\u8981\u89E3\u51B3\u7684\u95EE\u9898");
        scenario.focus();
        return;
      }
      submitServiceSuggestion(
        value,
        scenario.value.trim(),
        false,
        nowLabel,
        store.serviceSuggestions,
        user
      );
      emitChange();
      closeAllModals();
      showModal({ title: "\u5EFA\u8BAE\u5DF2\u63D0\u4EA4", body: "\u8FD0\u8425\u56E2\u961F\u4F1A\u5B9A\u671F\u67E5\u770B\u5E76\u8BC4\u4F30\u670D\u52A1\u7C7B\u76EE\u3002", confirmText: "\u77E5\u9053\u4E86" });
    });
    setTimeout(() => {
      input.focus();
    }, 0);
  }

  // src/pages/p1-home/Onboarding.js
  function hasSeenOnboarding() {
    return readText(ecologyOnboarding.storageKey, null) === ecologyOnboarding.version;
  }
  function rememberOnboarding() {
    writeText(ecologyOnboarding.storageKey, ecologyOnboarding.version);
  }
  function showOnboarding(force) {
    if (!force && hasSeenOnboarding()) return;
    const existing = document.querySelector(".p1-onboarding-overlay");
    if (existing) existing.remove();
    const config = ecologyOnboarding;
    const visualStyle = config.imageUrl ? ' style="background-image:url(' + config.imageUrl.replace(/["')]/g, "") + ')"' : "";
    const overlay = document.createElement("div");
    overlay.className = "p1-onboarding-overlay";
    overlay.setAttribute("tabindex", "-1");
    overlay.innerHTML = '<section class="p1-onboarding-dialog" role="dialog" aria-modal="true" aria-labelledby="p1OnboardingTitle"><div class="p1-onboarding-visual' + (config.imageUrl ? " has-image" : "") + '"' + visualStyle + '><button class="p1-onboarding-close" type="button" aria-label="\u5173\u95ED\u65B0\u624B\u5F15\u5BFC">' + icon("x", 18) + '</button><div class="p1-onboarding-visual-copy"><h2 id="p1OnboardingTitle">' + config.title + "</h2><p>" + config.visualSubtitle + '</p></div><div class="p1-onboarding-service-line">' + config.serviceLabels.map((label) => "<span>" + label + "</span>").join("") + '</div></div><div class="p1-onboarding-content"><p class="p1-onboarding-desc">' + config.description + '</p><div class="p1-onboarding-steps" aria-label="\u670D\u52A1\u6D41\u7A0B">' + config.steps.map((step, index) => "<span><b>" + (index + 1) + "</b>" + step + "</span>").join("") + '</div><button class="btn btn-primary btn-block p1-onboarding-primary" type="button">' + config.primaryText + '</button><button class="p1-onboarding-secondary" type="button">' + config.secondaryText + "</button></div></section>";
    document.querySelector(".phone-screen").appendChild(overlay);
    const dismiss = (next) => {
      rememberOnboarding();
      overlay.classList.add("is-closing");
      setTimeout(() => {
        overlay.remove();
        if (typeof next === "function") next();
      }, 170);
    };
    overlay.querySelector(".p1-onboarding-close").addEventListener("click", () => dismiss());
    overlay.querySelector(".p1-onboarding-secondary").addEventListener("click", () => dismiss());
    overlay.querySelector(".p1-onboarding-primary").addEventListener("click", () => dismiss(() => navigateTo("p5")));
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) dismiss();
    });
    overlay.addEventListener("keydown", (event) => {
      if (event.key === "Escape") dismiss();
    });
    setTimeout(() => {
      overlay.querySelector(".p1-onboarding-primary").focus();
    }, 180);
  }

  // src/pages/p1-home/SearchOverlay.js
  function rememberSearch(state2, value) {
    if (!value) return;
    state2.searchHistory = [value].concat(state2.searchHistory.filter((item) => item !== value)).slice(0, 4);
  }
  function openSearchOverlay(state2) {
    const overlay = document.createElement("div");
    overlay.className = "p1-search-overlay";
    overlay.id = "p1SearchOverlay";
    overlay.innerHTML = '<div class="p1-search-header"><div class="search-bar p1-search-input-wrap"><span class="search-icon">' + icon("search", 17) + '</span><input type="search" id="p1SearchInput" placeholder="\u641C\u7D22\u670D\u52A1\u3001\u56E2\u961F\u6216\u673A\u6784" autocomplete="off"></div><button class="p1-search-cancel" id="p1SearchCancel">\u53D6\u6D88</button></div><div class="p1-search-tabs is-hidden" id="p1SearchTabs"><button class="p1-search-tab active" data-type="all">\u5168\u90E8</button><button class="p1-search-tab" data-type="sku">\u670D\u52A1</button><button class="p1-search-tab" data-type="team">\u56E2\u961F</button><button class="p1-search-tab" data-type="org">\u673A\u6784</button></div><div class="p1-search-results" id="p1SearchResults"></div>';
    document.querySelector(".phone-screen").appendChild(overlay);
    const input = document.getElementById("p1SearchInput");
    const results = document.getElementById("p1SearchResults");
    const tabs = document.getElementById("p1SearchTabs");
    let activeType = "all";
    function renderExplore() {
      tabs.classList.add("is-hidden");
      let html = "";
      if (state2.searchHistory.length) {
        html += '<div class="p1-search-block"><div class="p1-search-block-title">\u6700\u8FD1\u641C\u7D22</div><div class="p1-search-chips">';
        state2.searchHistory.forEach((item) => {
          html += '<button data-search-key="' + item + '">' + item + "</button>";
        });
        html += "</div></div>";
      }
      html += '<div class="p1-search-block"><div class="p1-search-block-title">\u70ED\u95E8\u641C\u7D22</div><div class="p1-search-chips">';
      ["\u6295\u878D\u8D44\u670D\u52A1", "\u80A1\u6743\u67B6\u6784\u8BBE\u8BA1", "\u5546\u6807\u6CE8\u518C", "\u516C\u53F8\u6CE8\u518C"].forEach((item) => {
        html += '<button data-search-key="' + item + '">' + item + "</button>";
      });
      html += '</div></div><div class="p1-search-block"><div class="p1-search-block-title">\u5E38\u7528\u5206\u7C7B</div><div class="p1-search-category-links">';
      categories.filter((category) => !category.locked && category.kind !== "agents").forEach((category) => {
        html += '<button data-search-cat="' + category.id + '"><span>' + icon(category.icon, 18) + "</span>" + category.name + icon("chevron-right", 14) + "</button>";
      });
      html += "</div></div>";
      results.innerHTML = html;
      results.querySelectorAll("[data-search-key]").forEach((button) => {
        button.addEventListener("click", function() {
          input.value = this.getAttribute("data-search-key");
          renderResults();
          input.focus();
        });
      });
      results.querySelectorAll("[data-search-cat]").forEach((button) => {
        button.addEventListener("click", function() {
          overlay.remove();
          navigateTo("p2", { categoryId: this.getAttribute("data-search-cat") });
        });
      });
    }
    function renderResults() {
      const query = input.value.trim().toLowerCase();
      if (!query) {
        renderExplore();
        return;
      }
      tabs.classList.remove("is-hidden");
      const items = [];
      if (activeType === "all" || activeType === "sku") {
        if ("\u6295\u878D\u8D44\u670D\u52A1\u5BFB\u627E\u5339\u914D\u6295\u8D44\u4EBA\u5546\u4E1A\u8BA1\u5212\u4E66bp".includes(query)) {
          items.push({ type: "fundraising", id: "fundraising", title: "\u6295\u878D\u8D44\u670D\u52A1", meta: "\u63D0\u4EA4 BP\uFF0C\u5BFB\u627E\u504F\u597D\u5951\u5408\u7684\u6295\u8D44\u4EBA", icon: "trending-up" });
        }
        categories.forEach((category) => category.skus.forEach((sku) => {
          if (sku.toLowerCase().includes(query) || category.name.toLowerCase().includes(query)) {
            items.push({ type: "sku", id: sku, title: sku === "\u878D\u8D44\u4EA4\u6613" ? "\u878D\u8D44\u6CD5\u5F8B\u670D\u52A1" : sku, meta: sku === "\u878D\u8D44\u4EA4\u6613" ? "\u5C3D\u8C03\u3001\u4EA4\u6613\u6587\u4EF6\u4E0E\u8C08\u5224\u652F\u6301" : category.name, icon: category.icon });
          }
        }));
      }
      if (activeType === "all" || activeType === "team") {
        store.teams.forEach((team) => {
          if ([team.name, team.orgShort, team.skus.join("")].join("").toLowerCase().includes(query)) {
            items.push({ type: "team", id: team.id, title: team.name, meta: team.orgShort + " \xB7 " + team.skus.slice(0, 2).join("\u3001"), icon: "users" });
          }
        });
      }
      if (activeType === "all" || activeType === "org") {
        orgs.forEach((org) => {
          if ([org.name, org.shortName, org.fields.join("")].join("").toLowerCase().includes(query)) {
            items.push({ type: "org", id: org.id, title: org.name, meta: org.fields.slice(0, 2).join("\u3001"), icon: "building" });
          }
        });
      }
      if (!items.length) {
        results.innerHTML = '<div class="empty-state p1-search-empty"><div class="empty-icon">' + icon("search", 42) + '</div><div class="empty-title">\u6CA1\u6709\u627E\u5230\u76F8\u5173\u7ED3\u679C</div><div class="empty-desc">\u53EF\u4EE5\u53D1\u5E03\u9700\u6C42\u8BA9\u5E73\u53F0\u534F\u52A9\u5339\u914D\uFF0C\u4E5F\u53EF\u4EE5\u5EFA\u8BAE\u6211\u4EEC\u8865\u5145\u670D\u52A1\u7C7B\u76EE</div><button class="btn btn-primary" id="p1SearchPublish">\u53D1\u5E03\u9700\u6C42</button><button class="btn btn-outline" id="p1SearchSuggest">\u5EFA\u8BAE\u65B0\u589E\u670D\u52A1</button></div>';
        document.getElementById("p1SearchPublish").addEventListener("click", () => {
          overlay.remove();
          navigateTo("p5", { sku: input.value.trim() });
        });
        document.getElementById("p1SearchSuggest").addEventListener("click", () => {
          const value = input.value.trim();
          overlay.remove();
          openServiceSuggestion(value);
        });
        return;
      }
      results.innerHTML = '<div class="p1-search-result-list">' + items.slice(0, 20).map(
        (item) => '<button class="p1-search-result" data-result-type="' + item.type + '" data-result-id="' + item.id + '"><span class="p1-search-result-icon">' + icon(item.icon, 18) + '</span><span class="p1-search-result-copy"><span>' + item.title + "</span><small>" + item.meta + "</small></span>" + icon("chevron-right", 15) + "</button>"
      ).join("") + "</div>";
      results.querySelectorAll(".p1-search-result").forEach((row) => {
        row.addEventListener("click", function() {
          const type = this.getAttribute("data-result-type");
          const id = this.getAttribute("data-result-id");
          rememberSearch(state2, this.querySelector(".p1-search-result-copy span").textContent);
          overlay.remove();
          if (type === "fundraising") navigateTo("p12");
          else if (type === "sku") navigateTo("p5", { sku: id });
          else if (type === "team") navigateTo("p3", { teamId: id });
          else navigateTo("p4", { orgId: id });
        });
      });
    }
    document.querySelectorAll("#p1SearchTabs .p1-search-tab").forEach((tab) => {
      tab.addEventListener("click", function() {
        document.querySelectorAll("#p1SearchTabs .p1-search-tab").forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
        activeType = this.getAttribute("data-type");
        renderResults();
      });
    });
    input.addEventListener("input", renderResults);
    document.getElementById("p1SearchCancel").addEventListener("click", () => overlay.remove());
    renderExplore();
    setTimeout(() => input.focus(), 0);
  }

  // src/pages/p1-home/TodoBar.js
  function latestTodo() {
    return getLatestTodo(store.demands);
  }
  function renderTodoBar() {
    const demand = latestTodo();
    if (!demand) return "";
    let html = '<section class="p1-todo-wrap">';
    html += '<div class="p1-todo-head"><span class="p1-todo-head-title">\u6211\u7684\u670D\u52A1\u9700\u6C42</span>';
    html += '<button class="p1-todo-head-more" id="p1TodoMore">\u5168\u90E8 ' + store.demands.length + " " + icon("chevron-right", 13) + "</button>";
    html += "</div>";
    const tone = ["pending", "choosing", "communicating", "plan_pending"].includes(demand.status) ? " matching" : demand.status === "active" ? " active-service" : demand.status === "done" ? " completed" : " attention";
    html += '<button class="p1-todo-card' + tone + '" data-demand-id="' + demand.id + '">';
    html += '<span class="p1-todo-main"><span class="p1-todo-title">' + demand.title + '</span><span class="p1-todo-progress">' + (demand.progress || "") + "</span></span>";
    const action = demand.status === "done" && demand.hasReview ? "\u67E5\u770B\u8BC4\u4EF7" : TODO_STATUS_TEXT[demand.status] || "\u67E5\u770B\u8BE6\u60C5";
    html += '<span class="p1-todo-action">' + action + "</span>" + icon("chevron-right", 16);
    html += "</button></section>";
    return html;
  }
  function bindTodoBar() {
    const card = document.querySelector(".p1-todo-card");
    if (card) card.addEventListener("click", function() {
      const demand = getDemand(this.getAttribute("data-demand-id"), store.demands);
      const target = getTodoTarget(demand);
      navigateTo(target.page, target.params);
    });
    const more = document.getElementById("p1TodoMore");
    if (more) more.addEventListener("click", () => navigateTo("p9", {}));
  }

  // src/pages/p1-home/index.js
  var page = {
    searchHistory: ["\u5408\u540C\u5BA1\u67E5", "\u516C\u53F8\u6CE8\u518C"],
    render() {
      const favoriteCount = getFavoriteTeams(store.teams).length;
      const fundraising = getFundraisingSummary();
      let html = "";
      html += '<div class="p1-top"><div class="p1-search-row">';
      html += '<button class="search-bar p1-search-trigger" id="p1SearchBar"><span class="search-icon">' + icon("search", 17) + "</span><span>\u641C\u7D22\u670D\u52A1\u3001\u56E2\u961F\u6216\u673A\u6784</span></button></div>";
      html += '<button class="p1-publish" id="p1HeroCard"><span class="p1-publish-copy"><span class="p1-hero-title">\u8BF4\u6E05\u9700\u6C42\uFF0C\u627E\u5230\u5408\u9002\u56E2\u961F</span>';
      html += '<span class="p1-hero-sub">\u63CF\u8FF0\u4F60\u7684\u60C5\u51B5\uFF0C\u5E73\u53F0\u5C06\u5339\u914D\u7ECF\u8FC7\u8D44\u8D28\u6838\u9A8C\u7684\u670D\u52A1\u56E2\u961F</span><span class="p1-publish-cta">\u5F00\u59CB\u53D1\u5E03 ' + icon("arrow-right", 14) + "</span></span></button></div>";
      html += '<section class="section p1-service-section"><div class="section-header"><div><div class="section-title">\u4F01\u4E1A\u670D\u52A1</div><div class="p1-section-desc">\u8986\u76D6\u521B\u4E1A\u5E38\u89C1\u7684\u4E13\u4E1A\u670D\u52A1\u9700\u6C42</div></div>';
      html += '<button class="p1-service-favorites" id="p1Favorites">' + icon(favoriteCount ? "star" : "star-outline", 16) + "<span>\u6211\u7684\u6536\u85CF</span>" + (favoriteCount ? "<b>" + favoriteCount + "</b>" : "") + "</button></div>";
      html += '<div class="p1-fundraising"><button id="p1Fundraising" type="button"><span class="p1-fundraising-icon">' + icon("trending-up", 24) + '</span><span class="p1-fundraising-copy"><strong>\u6295\u878D\u8D44\u670D\u52A1</strong><small>' + (fundraising ? fundraising.title + " \xB7 " + fundraising.detail : "\u63D0\u4EA4 BP\uFF0C\u5339\u914D\u6295\u8D44\u504F\u597D\u5951\u5408\u7684\u6295\u8D44\u4EBA") + "</small><b>" + (fundraising ? fundraising.action : "\u5F00\u59CB\u878D\u8D44\u5339\u914D") + " " + icon("arrow-right", 13) + '</b></span><span class="p1-fundraising-visual" aria-hidden="true"><i></i><i></i><i></i></span></button></div>';
      html += '<div class="p1-category-grid">';
      categories.forEach((category) => {
        html += '<button class="p1-category-tile' + (category.locked ? " locked" : "") + '" data-cat="' + category.id + '" data-locked="' + category.locked + '">';
        html += '<span class="p1-cat-icon">' + icon(category.icon, 21) + "</span>";
        html += '<span class="p1-cat-copy"><span class="p1-cat-name">' + category.name + '</span><span class="p1-cat-desc">' + category.desc + "</span></span>";
        html += '<span class="p1-cat-tail">' + (category.locked ? "\u5373\u5C06\u4E0A\u7EBF" : icon("chevron-right", 15)) + "</span></button>";
      });
      html += "</div>";
      html += '<button class="service-suggestion-link p1-suggestion" type="button" id="p1ServiceSuggestion"><span>\u6CA1\u6709\u4F60\u8981\u627E\u7684\u670D\u52A1\uFF1F</span><strong>\u544A\u8BC9\u6211\u4EEC\u4F60\u7684\u9700\u6C42 ' + icon("arrow-right", 14) + "</strong></button></section>";
      html += renderTodoBar();
      html += '<div class="mb-4"></div>';
      return html;
    },
    init() {
      showTabBar(true);
      bindTodoBar();
      const favorites = document.getElementById("p1Favorites");
      if (favorites) favorites.addEventListener("click", openFavorites);
      document.getElementById("p1SearchBar").addEventListener("click", () => openSearchOverlay(page));
      document.getElementById("p1HeroCard").addEventListener("click", () => navigateTo("p5"));
      document.getElementById("p1Fundraising").addEventListener("click", () => navigateTo("p12"));
      document.getElementById("p1ServiceSuggestion").addEventListener("click", () => openServiceSuggestion(""));
      document.querySelectorAll(".p1-category-tile").forEach((tile) => {
        tile.addEventListener("click", function() {
          if (this.getAttribute("data-locked") === "true") {
            showModal({ title: "\u5373\u5C06\u4E0A\u7EBF", body: "\u8BE5\u7C7B\u76EE\u4ECD\u5728\u62DB\u52DF\u670D\u52A1\u56E2\u961F\uFF0C\u5F00\u653E\u540E\u4F1A\u5728\u9996\u9875\u5C55\u793A\u3002", confirmText: "\u77E5\u9053\u4E86" });
            return;
          }
          navigateTo("p2", { categoryId: this.getAttribute("data-cat") });
        });
      });
      setTimeout(() => showOnboarding(false), 180);
    }
  };
  register("p1", page);

  // src/components/tags.js
  var TAGS = {
    verified: { cls: "tag-verified", icon: "check-circle", text: "\u5DF2\u6838\u9A8C" },
    fast: { cls: "tag-fast", icon: "zap", text: "\u54CD\u5E94\u5FEB" },
    active: { cls: "tag-active", icon: "trending-up", text: "\u627F\u63A5\u6D3B\u8DC3" },
    good: { cls: "tag-good", icon: "star", text: "\u597D\u8BC4" },
    new: { cls: "tag-new", icon: "sparkles", text: "\u65B0\u5165\u9A7B" }
  };
  function renderTags(tags) {
    return tags.map((tag) => {
      const definition = TAGS[tag];
      if (!definition) return "";
      return '<span class="tag ' + definition.cls + '">' + icon(definition.icon, 12) + " " + definition.text + "</span>";
    }).join("");
  }
  function renderBadge(badge) {
    if (badge === "gold") return '<span class="tag tag-badge-gold">\u4F18\u9009</span>';
    if (badge === "flagship") return '<span class="tag tag-badge-flagship">\u65D7\u8230</span>';
    return "";
  }

  // src/components/teamCard.js
  function renderTeamCard(team) {
    const favorite = isFavoriteTeam(team.id);
    let html = '<article class="p2-card" data-team="' + team.id + '" role="button" tabindex="0"><span class="p2-card-main">';
    html += '<span class="p2-card-img" style="background:' + team.avatarColor + "18;color:" + team.avatarColor + '">' + team.avatar + "</span>";
    html += '<span class="p2-card-info"><span class="p2-card-title-row"><span class="p2-card-title-copy"><span class="p2-card-name">' + team.name + "</span></span>";
    html += '<span class="p2-card-title-actions">' + (team.badge ? renderBadge(team.badge) : "") + '<button class="p2-card-favorite' + (favorite ? " active" : "") + '" type="button" data-favorite-team="' + team.id + '" aria-label="' + (favorite ? "\u53D6\u6D88\u6536\u85CF" : "\u6536\u85CF\u56E2\u961F") + '" aria-pressed="' + favorite + '">' + icon(favorite ? "star" : "star-outline", 18) + "</button></span></span>";
    html += '<span class="p2-card-org">' + team.orgShort + "</span>";
    html += '<span class="p2-card-meta"><span class="p2-card-rating">' + icon("star", 14) + " " + team.rating + "</span><span>" + (team.reviewCount ? team.reviewCount + "\u6761\u8BC4\u4EF7" : "\u6682\u65E0\u8BC4\u4EF7") + "</span><span>\u5DF2\u5B8C\u6210" + (team.completedOrders || team.volume || 0) + "\u5355</span></span>";
    html += '<span class="p2-card-desc">' + (team.desc || "\u56E2\u961F\u4ECB\u7ECD\u5F85\u5B8C\u5584") + '</span><span class="p2-card-tags">';
    for (let index = 0; index < Math.min(team.skus.length, 3); index += 1) html += '<span class="sku-tag">' + team.skus[index] + "</span>";
    if (team.skus.length > 3) html += '<span class="sku-tag p2-more-tag">+' + (team.skus.length - 3) + "</span>";
    html += '</span><span class="p2-card-bottom"><span class="p2-card-loc">' + team.city + (team.avgResponse ? " \xB7 " + team.avgResponse + "\u5185\u54CD\u5E94" : "") + '</span><span class="p2-card-price">' + team.priceText + "</span></span>";
    html += "</span></span></article>";
    return html;
  }
  function renderTeamList(teams2) {
    if (!teams2.length) return '<div class="empty-state"><div class="empty-icon">' + icon("inbox", 48) + '</div><div class="empty-title">\u6682\u65E0\u5339\u914D\u56E2\u961F</div><div class="empty-desc">\u53EF\u4EE5\u8C03\u6574\u5173\u952E\u8BCD\u3001\u670D\u52A1\u9879\u76EE\u6216\u7B5B\u9009\u6761\u4EF6</div></div>';
    return teams2.map(renderTeamCard).join("");
  }
  function bindTeamCards() {
    document.querySelectorAll(".p2-card").forEach((card) => {
      card.addEventListener("click", function(event) {
        if (event.target.closest("[data-favorite-team]")) return;
        navigateTo("p3", { teamId: this.getAttribute("data-team") });
      });
      card.addEventListener("keydown", function(event) {
        if ((event.key === "Enter" || event.key === " ") && !event.target.closest("[data-favorite-team]")) {
          event.preventDefault();
          navigateTo("p3", { teamId: this.getAttribute("data-team") });
        }
      });
    });
    document.querySelectorAll("[data-favorite-team]").forEach((button) => {
      button.addEventListener("click", function(event) {
        event.stopPropagation();
        const active = toggleFavoriteTeam(this.getAttribute("data-favorite-team"));
        emitChange();
        this.classList.toggle("active", active);
        this.setAttribute("aria-pressed", active ? "true" : "false");
        this.setAttribute("aria-label", active ? "\u53D6\u6D88\u6536\u85CF" : "\u6536\u85CF\u56E2\u961F");
        this.innerHTML = icon(active ? "star" : "star-outline", 18);
        toast(active ? "\u5DF2\u6536\u85CF\u8BE5\u56E2\u961F" : "\u5DF2\u53D6\u6D88\u6536\u85CF");
      });
    });
  }
  function renderOrgTeamCard(team) {
    let html = '<div class="p4-team-card" data-team="' + team.id + '">';
    html += '<div class="avatar avatar-sm" style="background:' + team.avatarColor + "20;color:" + team.avatarColor + '">' + team.avatar + "</div>";
    html += '<div class="p4-team-info">';
    html += '<div class="p4-team-name">';
    html += team.name;
    if (team.badge) html += renderBadge(team.badge);
    html += renderTags(["verified"]);
    html += "</div>";
    html += '<div class="p4-team-meta">' + team.rating + "\u5206 \xB7 " + (team.reviewCount > 0 ? team.reviewCount + "\u6761\u8BC4\u4EF7" : "\u6682\u65E0\u8BC4\u4EF7") + " \xB7 " + team.city + "</div>";
    html += '<div class="p4-team-desc">' + team.desc + "</div>";
    html += '<div class="p4-team-services">' + team.skus.slice(0, 3).join(" \xB7 ") + "</div>";
    html += "</div>";
    html += '<div class="info-arrow">' + icon("chevron-right", 16) + "</div>";
    html += "</div>";
    return html;
  }
  function renderOrgTeamList(teams2) {
    return teams2.map(renderOrgTeamCard).join("");
  }
  function bindOrgTeamCards() {
    document.querySelectorAll(".p4-team-card").forEach((card) => {
      card.addEventListener("click", function() {
        navigateTo("p3", { teamId: this.getAttribute("data-team") });
      });
    });
  }

  // src/data/agents.js
  var agentCategories = [
    { id: "all", name: "\u5168\u90E8" },
    { id: "legal", name: "\u6CD5\u5F8B" },
    { id: "tax", name: "\u8D22\u7A0E" },
    { id: "ip", name: "\u77E5\u8BC6\u4EA7\u6743" },
    { id: "hr", name: "\u4EBA\u529B\u8D44\u6E90" }
  ];
  var agentCategoryMap = {
    law: "legal",
    finance: "tax",
    ip: "ip",
    hr: "hr"
  };
  var agents = [
    {
      id: "equity-precision",
      capabilityId: "equity",
      category: "legal",
      icon: "users",
      name: "\u80A1\u6743\u67B6\u6784 Agent",
      sortKey: "GUQUANJIAGOU",
      supplier: { id: "precision", name: "\u4E25\u8C28\u667A\u5E93" },
      recommended: true,
      status: "active",
      tags: ["\u80A1\u6743\u8BBE\u8BA1", "\u63A7\u5236\u6743"],
      description: "\u6839\u636E\u56E2\u961F\u5206\u5DE5\u4E0E\u878D\u8D44\u8BA1\u5212\uFF0C\u68B3\u7406\u80A1\u6743\u6BD4\u4F8B\u3001\u63A7\u5236\u6743\u548C\u9884\u7559\u7A7A\u95F4\u3002",
      price: "1.2 \u70B9/\u6B21",
      unitCost: 1.2,
      rating: 4.9,
      reviewCount: 68,
      connectorId: "api-precision-equity",
      prompts: ["\u4E09\u4F4D\u521B\u59CB\u4EBA\u5982\u4F55\u5206\u80A1\u6743", "\u5982\u4F55\u4FDD\u7559\u521B\u59CB\u4EBA\u63A7\u5236\u6743", "\u671F\u6743\u6C60\u5E94\u8BE5\u9884\u7559\u591A\u5C11"],
      humanCategoryId: "law",
      humanSku: "\u80A1\u6743\u67B6\u6784\u8BBE\u8BA1"
    },
    {
      id: "contract-insight",
      capabilityId: "contract",
      category: "legal",
      icon: "file-text",
      name: "\u5408\u540C\u5BA1\u67E5 Agent",
      sortKey: "HETONGSHENCHA",
      supplier: { id: "insight", name: "\u77E5\u5F8B\u5F15\u64CE" },
      recommended: true,
      status: "active",
      tags: ["\u98CE\u9669\u8BC6\u522B", "\u6761\u6B3E\u89E3\u8BFB"],
      description: "\u4E0A\u4F20\u5408\u540C\uFF0C\u5FEB\u901F\u5B9A\u4F4D\u8D23\u4EFB\u8FB9\u754C\u3001\u8FDD\u7EA6\u8D23\u4EFB\u548C\u4E89\u8BAE\u89E3\u51B3\u7B49\u5173\u952E\u98CE\u9669\u3002",
      price: "0.8 \u70B9/\u6B21",
      unitCost: 0.8,
      rating: 4.8,
      reviewCount: 126,
      connectorId: "api-insight-contract",
      prompts: ["\u5E2E\u6211\u5BA1\u67E5\u8FD9\u4EFD\u5408\u540C", "\u89E3\u91CA\u8FD9\u6761\u8FDD\u7EA6\u8D23\u4EFB", "\u5217\u51FA\u9700\u8981\u91CD\u70B9\u8C08\u5224\u7684\u6761\u6B3E"],
      humanCategoryId: "law",
      humanSku: "\u5408\u540C\u5BA1\u67E5"
    },
    {
      id: "contract-precision",
      capabilityId: "contract",
      category: "legal",
      icon: "file-text",
      name: "\u5408\u540C\u5BA1\u67E5 Agent",
      sortKey: "HETONGSHENCHA",
      supplier: { id: "precision", name: "\u4E25\u8C28\u667A\u5E93" },
      recommended: false,
      status: "active",
      tags: ["\u89C4\u5219\u4F9D\u636E", "\u6DF1\u5EA6\u5BA1\u67E5"],
      description: "\u7ED3\u5408\u5408\u540C\u573A\u666F\u9010\u6761\u89E3\u91CA\u98CE\u9669\u4F9D\u636E\uFF0C\u5E76\u7ED9\u51FA\u53EF\u76F4\u63A5\u6C9F\u901A\u7684\u4FEE\u6539\u5EFA\u8BAE\u3002",
      price: "1.2 \u70B9/\u6B21",
      unitCost: 1.2,
      rating: 4.9,
      reviewCount: 74,
      connectorId: "api-precision-contract",
      prompts: ["\u5E2E\u6211\u5BA1\u67E5\u8FD9\u4EFD\u5408\u540C", "\u8BF4\u660E\u8FD9\u4E9B\u98CE\u9669\u7684\u6CD5\u5F8B\u4F9D\u636E", "\u751F\u6210\u6761\u6B3E\u4FEE\u6539\u5EFA\u8BAE"],
      humanCategoryId: "law",
      humanSku: "\u5408\u540C\u5BA1\u67E5"
    },
    {
      id: "labor-fast",
      capabilityId: "hr-policy",
      category: "legal",
      icon: "briefcase",
      name: "\u52B3\u52A8\u5408\u89C4 Agent",
      sortKey: "LAODONGHEGUI",
      supplier: { id: "fast", name: "\u8FC5\u7B54\u4E13\u4E1A\u7248" },
      recommended: false,
      status: "paused",
      tags: ["\u7528\u5DE5\u5236\u5EA6", "\u52B3\u52A8\u98CE\u9669"],
      description: "\u68B3\u7406\u521D\u521B\u56E2\u961F\u5E38\u89C1\u7684\u52B3\u52A8\u5408\u540C\u3001\u52A0\u73ED\u4E0E\u89E3\u9664\u98CE\u9669\u3002",
      price: "0.6 \u70B9/\u6B21",
      unitCost: 0.6,
      rating: 4.7,
      reviewCount: 32,
      connectorId: "api-fast-labor",
      prompts: ["\u68C0\u67E5\u52B3\u52A8\u5408\u540C", "\u5982\u4F55\u5408\u89C4\u5904\u7406\u52A0\u73ED", "\u68B3\u7406\u89E3\u9664\u98CE\u9669"],
      humanCategoryId: "law",
      humanSku: "\u52B3\u52A8\u5408\u89C4"
    },
    {
      id: "tax-policy-finpilot",
      capabilityId: "tax-policy",
      category: "tax",
      icon: "coins",
      name: "\u7A0E\u52A1\u653F\u7B56 Agent",
      sortKey: "SHUIWUZHENGCE",
      supplier: { id: "finpilot", name: "\u8D22\u667A\u5BFC\u822A" },
      recommended: true,
      status: "active",
      tags: ["\u653F\u7B56\u89E3\u8BFB", "\u7533\u62A5\u63D0\u9192"],
      description: "\u89E3\u8BFB\u4F01\u4E1A\u9002\u7528\u7684\u7A0E\u6536\u653F\u7B56\uFF0C\u6574\u7406\u9002\u7528\u6761\u4EF6\u3001\u7533\u62A5\u53E3\u5F84\u548C\u6CE8\u610F\u4E8B\u9879\u3002",
      price: "0.6 \u70B9/\u6B21",
      unitCost: 0.6,
      rating: 4.8,
      reviewCount: 91,
      connectorId: "api-finpilot-tax",
      prompts: ["\u9AD8\u65B0\u4F01\u4E1A\u6709\u54EA\u4E9B\u7A0E\u6536\u4F18\u60E0", "\u7814\u53D1\u8D39\u7528\u52A0\u8BA1\u6263\u9664\u600E\u4E48\u7B97", "\u5C0F\u89C4\u6A21\u7EB3\u7A0E\u4EBA\u5982\u4F55\u7533\u62A5"],
      humanCategoryId: "finance",
      humanSku: "\u8D22\u7A0E\u54A8\u8BE2"
    },
    {
      id: "tax-policy-insight",
      capabilityId: "tax-policy",
      category: "tax",
      icon: "coins",
      name: "\u7A0E\u52A1\u653F\u7B56 Agent",
      sortKey: "SHUIWUZHENGCE",
      supplier: { id: "insight", name: "\u77E5\u7B56\u6570\u636E" },
      recommended: false,
      status: "active",
      tags: ["\u653F\u7B56\u68C0\u7D22", "\u53E3\u5F84\u6838\u5BF9"],
      description: "\u6309\u4F01\u4E1A\u7C7B\u578B\u548C\u6240\u5728\u5730\u533A\u68C0\u7D22\u653F\u7B56\uFF0C\u5E2E\u52A9\u6838\u5BF9\u9002\u7528\u53E3\u5F84\u3002",
      price: "0.4 \u70B9/\u6B21",
      unitCost: 0.4,
      rating: 4.7,
      reviewCount: 43,
      connectorId: "api-insight-tax",
      prompts: ["\u67E5\u8BE2\u672C\u5730\u7A0E\u6536\u653F\u7B56", "\u6838\u5BF9\u653F\u7B56\u9002\u7528\u6761\u4EF6", "\u6574\u7406\u7533\u62A5\u6750\u6599"],
      humanCategoryId: "finance",
      humanSku: "\u8D22\u7A0E\u54A8\u8BE2"
    },
    {
      id: "trademark-ipstar",
      capabilityId: "trademark",
      category: "ip",
      icon: "shield",
      name: "\u5546\u6807\u68C0\u7D22 Agent",
      sortKey: "SHANGBIAOJIANSUO",
      supplier: { id: "ipstar", name: "\u77E5\u4EA7\u661F\u56FE" },
      recommended: true,
      status: "active",
      tags: ["\u8FD1\u4F3C\u68C0\u7D22", "\u7C7B\u522B\u5EFA\u8BAE"],
      description: "\u5FEB\u901F\u68B3\u7406\u5546\u6807\u8FD1\u4F3C\u98CE\u9669\u3001\u6CE8\u518C\u7C7B\u522B\u4E0E\u63D0\u4EA4\u524D\u9700\u8981\u51C6\u5907\u7684\u6750\u6599\u3002",
      price: "0.5 \u70B9/\u6B21",
      unitCost: 0.5,
      rating: 4.9,
      reviewCount: 105,
      connectorId: "api-ipstar-trademark",
      prompts: ["\u8FD9\u4E2A\u540D\u5B57\u80FD\u6CE8\u518C\u5546\u6807\u5417", "\u8F6F\u4EF6\u4EA7\u54C1\u5E94\u8BE5\u6CE8\u518C\u54EA\u4E00\u7C7B", "\u89E3\u91CA\u5546\u6807\u8FD1\u4F3C\u98CE\u9669"],
      humanCategoryId: "ip",
      humanSku: "\u5546\u6807\u6CE8\u518C"
    },
    {
      id: "patent-ipstar",
      capabilityId: "patent",
      category: "ip",
      icon: "bulb",
      name: "\u4E13\u5229\u521D\u7B5B Agent",
      sortKey: "ZHUANLICHUSHAI",
      supplier: { id: "ipstar", name: "\u77E5\u4EA7\u661F\u56FE" },
      recommended: false,
      status: "active",
      tags: ["\u6280\u672F\u4EA4\u5E95", "\u7533\u8BF7\u5EFA\u8BAE"],
      description: "\u6839\u636E\u6280\u672F\u65B9\u6848\u68B3\u7406\u53EF\u4FDD\u62A4\u7684\u521B\u65B0\u70B9\uFF0C\u5E76\u63D0\u793A\u7533\u8BF7\u524D\u9700\u8981\u8865\u5145\u7684\u4FE1\u606F\u3002",
      price: "0.9 \u70B9/\u6B21",
      unitCost: 0.9,
      rating: 4.8,
      reviewCount: 47,
      connectorId: "api-ipstar-patent",
      prompts: ["\u5224\u65AD\u6280\u672F\u65B9\u6848\u80FD\u5426\u7533\u8BF7\u4E13\u5229", "\u6574\u7406\u6280\u672F\u4EA4\u5E95\u8981\u70B9", "\u5E94\u8BE5\u7533\u8BF7\u54EA\u79CD\u4E13\u5229"],
      humanCategoryId: "ip",
      humanSku: "\u4E13\u5229\u7533\u8BF7"
    },
    {
      id: "hr-policy-peoplelab",
      capabilityId: "hr-policy",
      category: "hr",
      icon: "briefcase",
      name: "\u7528\u5DE5\u5236\u5EA6 Agent",
      sortKey: "YONGGONGZHIDU",
      supplier: { id: "peoplelab", name: "\u4EBA\u6548\u5B9E\u9A8C\u5BA4" },
      recommended: true,
      status: "active",
      tags: ["\u5236\u5EA6\u8D77\u8349", "\u52B3\u52A8\u5408\u89C4"],
      description: "\u8F85\u52A9\u8D77\u8349\u5458\u5DE5\u624B\u518C\u548C\u5E38\u7528\u5236\u5EA6\uFF0C\u63D0\u793A\u521D\u521B\u56E2\u961F\u5E38\u89C1\u7528\u5DE5\u98CE\u9669\u3002",
      price: "0.7 \u70B9/\u6B21",
      unitCost: 0.7,
      rating: 4.8,
      reviewCount: 58,
      connectorId: "api-peoplelab-hr",
      prompts: ["\u8D77\u8349\u4E00\u4EFD\u8BD5\u7528\u671F\u5236\u5EA6", "\u5458\u5DE5\u624B\u518C\u9700\u8981\u5305\u542B\u4EC0\u4E48", "\u5982\u4F55\u5408\u89C4\u5904\u7406\u52A0\u73ED"],
      humanCategoryId: "hr",
      humanSku: "\u52B3\u52A8\u5408\u89C4"
    }
  ];
  function sortAgents(list) {
    return [...list].sort((a, b) => {
      if (a.status !== b.status) return a.status === "active" ? -1 : 1;
      const nameOrder = a.sortKey.localeCompare(b.sortKey, "en");
      if (nameOrder !== 0) return nameOrder;
      return a.supplier.name.localeCompare(b.supplier.name, "zh-CN");
    });
  }
  function getAgentsByCategory(category, options = {}) {
    let result = category && category !== "all" ? agents.filter((item) => item.category === category) : agents;
    if (options.activeOnly) result = result.filter((item) => item.status === "active");
    return sortAgents(result);
  }
  function getAgent(agentId) {
    return agents.find((item) => item.id === agentId) || sortAgents(agents)[0];
  }

  // src/pages/p2-list/FilterSheet.js
  var ui4 = {
    iconPaths,
    iconFilled,
    icon(name, size) {
      return icon.call(ui4, name, size);
    }
  };
  var DEFAULT_FILTERS = Object.freeze({ city: "all", price: "all", rating: "all", badge: "all" });
  function createDefaultFilters() {
    return { ...DEFAULT_FILTERS };
  }
  function openFilterSheet(state2, onChange) {
    const filters = state2.filters;
    const group = (title, key, options) => '<div class="p2-filter-group"><div class="p2-filter-title">' + title + '</div><div class="p2-filter-options">' + options.map(
      (item) => '<button class="p2-filter-option' + (filters[key] === item.key ? " selected" : "") + '" data-filter-key="' + key + '" data-filter-value="' + item.key + '">' + item.label + "</button>"
    ).join("") + "</div></div>";
    const body = '<div class="p2-filter-sheet">' + group("\u6240\u5728\u57CE\u5E02", "city", [{ key: "all", label: "\u4E0D\u9650" }, { key: "\u5317\u4EAC", label: "\u5317\u4EAC" }, { key: "\u4E0A\u6D77", label: "\u4E0A\u6D77" }]) + group("\u8D77\u6B65\u4EF7\u683C", "price", [{ key: "all", label: "\u4E0D\u9650" }, { key: "under1000", label: "1000\u5143\u4EE5\u4E0B" }, { key: "1000to3000", label: "1000-3000\u5143" }, { key: "over3000", label: "3000\u5143\u4EE5\u4E0A" }]) + group("\u56E2\u961F\u8BC4\u5206", "rating", [{ key: "all", label: "\u4E0D\u9650" }, { key: "4.8", label: "4.8\u5206\u4EE5\u4E0A" }]) + group("\u56E2\u961F\u6807\u8BC6", "badge", [{ key: "all", label: "\u4E0D\u9650" }, { key: "gold", label: "\u4F18\u9009" }, { key: "flagship", label: "\u65D7\u8230" }]) + '<div class="p2-filter-actions"><button class="btn btn-outline" id="p2FilterReset">\u91CD\u7F6E</button><button class="btn btn-primary" id="p2FilterApply">\u5E94\u7528\u7B5B\u9009</button></div></div>';
    showSheet.call(ui4, { title: "\u7B5B\u9009\u56E2\u961F", body });
    document.querySelectorAll(".p2-filter-option").forEach((option) => {
      option.addEventListener("click", function() {
        const key = this.getAttribute("data-filter-key");
        document.querySelectorAll('.p2-filter-option[data-filter-key="' + key + '"]').forEach((item) => item.classList.remove("selected"));
        this.classList.add("selected");
      });
    });
    document.getElementById("p2FilterReset").addEventListener("click", () => {
      state2.filters = createDefaultFilters();
      closeAllModals();
      onChange();
    });
    document.getElementById("p2FilterApply").addEventListener("click", () => {
      document.querySelectorAll(".p2-filter-option.selected").forEach((item) => {
        state2.filters[item.getAttribute("data-filter-key")] = item.getAttribute("data-filter-value");
      });
      closeAllModals();
      onChange();
    });
  }
  function updateFilterLabel(filters) {
    const count = Object.keys(filters).filter((key) => filters[key] !== "all").length;
    const button = document.getElementById("p2FilterBtn");
    if (button) button.innerHTML = (count ? "\u7B5B\u9009 " + count : "\u7B5B\u9009") + '<span class="arrow">' + icon("chevron-down", 12) + "</span>";
  }

  // src/pages/p2-list/index.js
  var agentCategoriesCopy = {
    legal: "\u6CD5\u5F8B",
    tax: "\u8D22\u7A0E",
    ip: "\u77E5\u8BC6\u4EA7\u6743",
    hr: "\u4EBA\u529B\u8D44\u6E90"
  };
  function parsePrice(text) {
    const value = parseFloat(String(text || "").replace(/[^0-9.]/g, "")) || 0;
    return String(text).includes("\u4E07") ? value * 1e4 : value;
  }
  var page2 = {
    state: { categoryId: "", query: "", activeSkus: [], filters: null },
    render(params) {
      const category = getCategory(params.categoryId);
      const teams2 = getTeamsByCategory(params.categoryId, store.teams);
      const skus = category ? category.skus : [];
      this.state = {
        categoryId: params.categoryId,
        query: "",
        activeSkus: [],
        filters: createDefaultFilters()
      };
      let html = '<div class="nav-bar"><button class="nav-back" id="p2Back">' + icon("chevron-left", 22) + '</button><div class="nav-title">' + (category ? category.name : "\u670D\u52A1\u56E2\u961F") + '</div><div class="nav-action"></div></div>';
      html += '<div class="p2-search-wrap"><label class="search-bar p2-search-field"><span class="search-icon">' + icon("search", 16) + '</span><input id="p2SearchInput" type="search" placeholder="\u641C\u7D22\u56E2\u961F\u6216\u670D\u52A1\u9879\u76EE" autocomplete="off"></label></div>';
      if (skus.length) {
        html += '<div class="p2-quick-tags" id="p2QuickTags">';
        for (let index = 0; index < Math.min(skus.length, 6); index += 1) html += '<button class="sku-tag" data-sku="' + skus[index] + '">' + skus[index] + "</button>";
        html += "</div>";
      }
      html += this.renderAgentSpotlight(params.categoryId);
      html += '<div class="p2-toolbar"><strong>\u771F\u4EBA\u670D\u52A1\u56E2\u961F</strong><span class="p2-count">\u5171 ' + teams2.length + ' \u4E2A</span><div class="flex-1"></div><button class="filter-chip" id="p2FilterBtn">\u7B5B\u9009<span class="arrow">' + icon("chevron-down", 12) + "</span></button></div>";
      html += '<div id="p2CardList">' + renderTeamList(teams2) + "</div>";
      const isNonstandard = params.categoryId === "ip" || params.categoryId === "policy";
      html += '<div class="p2-price-note">' + (isNonstandard ? "\u6B64\u7C7B\u670D\u52A1\u6309\u9879\u76EE\u8BC4\u4F30\uFF0C\u56E2\u961F\u786E\u8BA4\u8303\u56F4\u540E\u63D0\u4F9B\u65B9\u6848\u4E0E\u5206\u9636\u6BB5\u62A5\u4EF7" : "\u4EE5\u4E0A\u5747\u4E3A\u53C2\u8003\u8D77\u4EF7\uFF0C\u6700\u7EC8\u4EE5\u670D\u52A1\u65B9\u6848\u4E3A\u51C6") + "</div>";
      html += '<button class="service-suggestion-link p2-suggestion" type="button" id="p2ServiceSuggestion"><span>\u6CA1\u6709\u4F60\u8981\u627E\u7684\u670D\u52A1\uFF1F</span><strong>\u544A\u8BC9\u6211\u4EEC\u4F60\u7684\u9700\u6C42 ' + icon("arrow-right", 14) + "</strong></button>";
      return html;
    },
    renderAgentSpotlight(categoryId) {
      const agentCategory = agentCategoryMap[categoryId];
      if (!agentCategory) return "";
      const activeAgents = getAgentsByCategory(agentCategory, { activeOnly: true });
      if (!activeAgents.length) return "";
      const category = agentCategoriesCopy[agentCategory];
      const suppliers = new Set(activeAgents.map((agent) => agent.supplier.id));
      const preview = activeAgents.slice(0, 3).map((agent) => "<span>" + icon(agent.icon, 15) + "</span>").join("");
      return '<section class="p2-agent-spotlight"><button type="button" id="p2AgentStart"><span class="p2-agent-preview">' + preview + '</span><span class="p2-agent-spotlight-copy"><strong>' + category + "\u667A\u80FD\u4F53\u4E13\u533A</strong><small>\u5148\u83B7\u5F97\u5373\u65F6\u5206\u6790\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u9700\u8981\u771F\u4EBA\u670D\u52A1</small><b>" + activeAgents.length + " \u4E2A\u667A\u80FD\u4F53\u5728\u7EBF \xB7 \u6765\u81EA " + suppliers.size + ' \u5BB6\u4E13\u4E1A\u4F9B\u5E94\u5546</b></span><span class="p2-agent-spotlight-action">\u8FDB\u5165\u4E13\u533A ' + icon("arrow-right", 14) + "</span></button></section>";
    },
    _renderCard: renderTeamCard,
    renderList: renderTeamList,
    getVisibleTeams() {
      const state2 = this.state;
      return getTeamsByCategory(state2.categoryId, store.teams).filter((team) => {
        if (state2.activeSkus.length && !team.skus.some((sku) => state2.activeSkus.includes(sku))) return false;
        if (state2.filters.city !== "all" && team.city !== state2.filters.city) return false;
        const price = parsePrice(team.priceText);
        if (state2.filters.price === "under1000" && price >= 1e3) return false;
        if (state2.filters.price === "1000to3000" && (price < 1e3 || price > 3e3)) return false;
        if (state2.filters.price === "over3000" && price <= 3e3) return false;
        if (state2.filters.rating === "4.8" && team.rating < 4.8) return false;
        if (state2.filters.badge !== "all" && team.badge !== state2.filters.badge) return false;
        if (!state2.query) return true;
        return [team.name, team.orgShort, team.desc, team.skus.join("")].join("").toLowerCase().includes(state2.query.toLowerCase());
      });
    },
    parsePrice,
    refreshList() {
      const teams2 = this.getVisibleTeams();
      document.getElementById("p2CardList").innerHTML = renderTeamList(teams2);
      document.querySelector(".p2-count").textContent = "\u5171 " + teams2.length + " \u4E2A\u670D\u52A1\u56E2\u961F";
      bindTeamCards();
    },
    bindCards: bindTeamCards,
    init() {
      showTabBar(false);
      document.getElementById("p2Back").addEventListener("click", goBackToPrevious);
      document.getElementById("p2SearchInput").addEventListener("input", function() {
        page2.state.query = this.value.trim();
        page2.refreshList();
      });
      document.querySelectorAll("#p2QuickTags .sku-tag").forEach((tag) => {
        tag.addEventListener("click", function() {
          const sku = this.getAttribute("data-sku");
          const index = page2.state.activeSkus.indexOf(sku);
          if (index >= 0) page2.state.activeSkus.splice(index, 1);
          else page2.state.activeSkus.push(sku);
          this.classList.toggle("active", index < 0);
          page2.refreshList();
        });
      });
      document.getElementById("p2FilterBtn").addEventListener("click", () => page2.openFilterSheet());
      const agentStart = document.getElementById("p2AgentStart");
      if (agentStart) agentStart.addEventListener("click", () => navigateTo("p11", { category: agentCategoryMap[page2.state.categoryId] }));
      document.getElementById("p2ServiceSuggestion").addEventListener("click", () => openServiceSuggestion(page2.state.query));
      bindTeamCards();
    },
    openFilterSheet() {
      openFilterSheet(this.state, () => {
        this.updateFilterLabel();
        this.refreshList();
      });
    },
    updateFilterLabel() {
      updateFilterLabel(this.state.filters);
    }
  };
  register("p2", page2);

  // src/components/entityGallery.js
  var feedbackHost = { iconPaths, iconFilled, icon };
  function getEntityGallery(entity, type) {
    if (entity && entity.gallery && entity.gallery.length) return entity.gallery;
    const name = entity ? entity.name || entity.shortName || "" : "";
    const logo = entity ? entity.avatar || entity.logo || name.charAt(0) : "";
    const teamLabels = ["\u56E2\u961F\u529E\u516C\u4E0E\u63A5\u5F85", "\u9879\u76EE\u8BA8\u8BBA\u73B0\u573A", "\u4E13\u4E1A\u670D\u52A1\u8D44\u6599", "\u56E2\u961F\u5DE5\u4F5C\u7167"];
    const orgLabels = ["\u673A\u6784\u529E\u516C\u73AF\u5883", "\u5BA2\u6237\u63A5\u5F85\u7A7A\u95F4", "\u673A\u6784\u56E2\u961F\u5408\u7167", "\u4E13\u4E1A\u670D\u52A1\u8D44\u6599"];
    const labels = type === "org" ? orgLabels : teamLabels;
    const colors = [
      ["#2A2A8A", "#5151CC"],
      ["#31309E", "#5B5BD6"],
      ["#3A3AB4", "#6E6EE0"],
      ["#4242C4", "#8080F2"]
    ];
    return labels.map((label, index) => ({ label, mark: logo, name, colors: colors[index] }));
  }
  function renderEntityGallery(entity, type) {
    const gallery = getEntityGallery(entity, type);
    let html = '<div class="entity-gallery" data-entity-gallery><div class="entity-gallery-track">';
    gallery.forEach((item, index) => {
      const colors = item.colors || ["#31309E", "#5B5BD6"];
      html += '<button class="entity-gallery-slide" type="button" data-gallery-index="' + index + '" style="--gallery-a:' + colors[0] + ";--gallery-b:" + colors[1] + '">';
      html += '<span class="entity-gallery-grid"></span><span class="entity-gallery-mark">' + (item.mark || "") + "</span>";
      html += '<span class="entity-gallery-caption"><strong>' + item.label + "</strong><small>" + (item.name || "") + "</small></span></button>";
    });
    html += '</div><span class="entity-gallery-count"><b>1</b>/' + gallery.length + '</span><span class="entity-gallery-hint">\u5DE6\u53F3\u6ED1\u52A8\u67E5\u770B</span></div>';
    return html;
  }
  function bindEntityGallery(root, entity, type) {
    const scope = root || document;
    const galleryElement = scope.querySelector("[data-entity-gallery]");
    if (!galleryElement) return;
    const track = galleryElement.querySelector(".entity-gallery-track");
    const counter = galleryElement.querySelector(".entity-gallery-count b");
    const slides = galleryElement.querySelectorAll(".entity-gallery-slide");
    const items = getEntityGallery(entity, type);
    if (track && counter) track.addEventListener("scroll", () => {
      const width = track.clientWidth || 1;
      counter.textContent = Math.min(slides.length, Math.max(1, Math.round(track.scrollLeft / width) + 1));
    });
    slides.forEach((slide) => {
      slide.addEventListener("click", function() {
        const index = Number(this.getAttribute("data-gallery-index") || 0);
        const item = items[index];
        const colors = item.colors || ["#31309E", "#5B5BD6"];
        showSheet.call(feedbackHost, {
          title: item.label,
          body: '<div class="entity-gallery-preview" style="--gallery-a:' + colors[0] + ";--gallery-b:" + colors[1] + '"><span>' + item.mark + "</span><strong>" + item.name + '</strong></div><p class="entity-gallery-preview-note">\u6F14\u793A\u56FE\u4F4D\uFF1A\u6B63\u5F0F\u7248\u672C\u5C55\u793A\u670D\u52A1\u56E2\u961F\u4E0A\u4F20\u5E76\u7ECF\u5E73\u53F0\u5BA1\u6838\u7684\u771F\u5B9E\u56FE\u7247\u3002</p>'
        });
      });
    });
  }

  // src/components/stars.js
  function renderStars(rating) {
    const full = Math.round(rating);
    let html = "";
    for (let index = 0; index < 5; index += 1) {
      if (index < full) html += icon("star", 14);
      else html += '<span class="star-empty">' + icon("star", 14) + "</span>";
    }
    return '<span class="stars">' + html + "</span>";
  }

  // src/data/stagedServices.js
  var intellectualPropertySkus = /* @__PURE__ */ new Set([
    "\u5546\u6807\u6CE8\u518C",
    "\u4E13\u5229\u7533\u8BF7",
    "\u8457\u4F5C\u6743\u767B\u8BB0",
    "\u5546\u6807\u9A73\u56DE\u590D\u5BA1",
    "\u4E13\u5229\u4FB5\u6743\u5206\u6790"
  ]);
  var policySkus = /* @__PURE__ */ new Set([
    "\u9AD8\u65B0\u6280\u672F\u4F01\u4E1A\u8BA4\u5B9A",
    "\u4E13\u7CBE\u7279\u65B0\u7533\u62A5",
    "\u79D1\u6280\u9879\u76EE\u7533\u62A5"
  ]);
  var CONFIGS = {
    ip: {
      categoryName: "\u77E5\u8BC6\u4EA7\u6743",
      total: "\xA512,000",
      firstAmount: "\xA56,000",
      secondAmount: "\xA56,000",
      period: "\u9884\u8BA1 3\u20146 \u4E2A\u6708\uFF0C\u4E3B\u7BA1\u673A\u6784\u5BA1\u67E5\u65F6\u95F4\u53E6\u8BA1",
      intakeLabel: "\u8BF7\u8BF4\u660E\u7533\u8BF7\u5BF9\u8C61\u3001\u6570\u91CF\u53CA\u5F53\u524D\u6750\u6599\u60C5\u51B5",
      intakeExample: "\u8BA1\u5212\u7533\u8BF7 2 \u4EF6\u5546\u6807\uFF0C\u5DF2\u6709\u5546\u6807\u56FE\u6837\u548C\u8425\u4E1A\u6267\u7167\uFF0C\u5E0C\u671B\u5148\u5B8C\u6210\u8FD1\u4F3C\u68C0\u7D22\u3002",
      firstWork: ["\u5B8C\u6210\u57FA\u7840\u68C0\u7D22\u4E0E\u98CE\u9669\u5206\u6790", "\u5F62\u6210\u7533\u8BF7\u7B56\u7565\u53CA\u7C7B\u522B\u5EFA\u8BAE", "\u51C6\u5907\u5E76\u5B9A\u7A3F\u7533\u8BF7\u6587\u4EF6"],
      milestoneTitle: "\u68C0\u7D22\u5206\u6790\u4E0E\u7533\u8BF7\u6587\u4EF6\u5DF2\u5B8C\u6210",
      milestoneDetail: "\u5BA2\u6237\u786E\u8BA4\u7533\u8BF7\u6587\u4EF6\u540E\uFF0C\u8FDB\u5165\u6B63\u5F0F\u63D0\u4EA4\u4E0E\u5BA1\u67E5\u8DDF\u8FDB\u9636\u6BB5\u3002",
      secondTrigger: "\u7533\u8BF7\u6587\u4EF6\u5B9A\u7A3F\u5E76\u7ECF\u5BA2\u6237\u786E\u8BA4\uFF0C\u6B63\u5F0F\u63D0\u4EA4\u524D\u652F\u4ED8",
      secondWork: ["\u5411\u4E3B\u7BA1\u673A\u6784\u6B63\u5F0F\u63D0\u4EA4\u7533\u8BF7", "\u8DDF\u8FDB\u53D7\u7406\u53CA\u5BA1\u67E5\u8FDB\u5EA6", "\u6309\u7EA6\u5904\u7406\u4E00\u6B21\u8865\u6B63\u6216\u5BA1\u67E5\u610F\u89C1"],
      resultTitle: "\u672C\u6B21\u7533\u8BF7\u672A\u83B7\u6838\u51C6",
      resultDetail: "\u4E3B\u7BA1\u673A\u6784\u5DF2\u51FA\u5177\u7ED3\u679C\uFF0C\u670D\u52A1\u56E2\u961F\u5B8C\u6210\u4E86\u534F\u8BAE\u7EA6\u5B9A\u7684\u68C0\u7D22\u3001\u6750\u6599\u51C6\u5907\u3001\u63D0\u4EA4\u53CA\u8DDF\u8FDB\u5DE5\u4F5C\u3002",
      resultFile: "\u4E3B\u7BA1\u673A\u6784\u5BA1\u67E5\u7ED3\u679C\u901A\u77E5.pdf"
    },
    policy: {
      categoryName: "\u653F\u7B56\u7533\u62A5",
      total: "\xA520,000",
      firstAmount: "\xA510,000",
      secondAmount: "\xA510,000",
      period: "\u9884\u8BA1 2\u20144 \u4E2A\u6708\uFF0C\u4EE5\u7533\u62A5\u7A97\u53E3\u548C\u8BC4\u5BA1\u5B89\u6392\u4E3A\u51C6",
      intakeLabel: "\u8BF7\u8BF4\u660E\u4F01\u4E1A\u8D44\u8D28\u3001\u6240\u5728\u5730\u533A\u548C\u610F\u5411\u7533\u62A5\u9879\u76EE",
      intakeExample: "\u5317\u4EAC\u79D1\u6280\u4F01\u4E1A\uFF0C\u6210\u7ACB\u6EE1 2 \u5E74\uFF0C\u8BA1\u5212\u7533\u62A5\u9AD8\u65B0\u6280\u672F\u4F01\u4E1A\u8BA4\u5B9A\uFF0C\u5DF2\u6709\u7814\u53D1\u548C\u8D22\u52A1\u8D44\u6599\u3002",
      firstWork: ["\u5B8C\u6210\u7533\u62A5\u8D44\u683C\u4E0E\u5DEE\u8DDD\u8BC4\u4F30", "\u5F62\u6210\u7533\u62A5\u89C4\u5212\u53CA\u6750\u6599\u6E05\u5355", "\u6574\u7406\u5E76\u5B9A\u7A3F\u7533\u62A5\u6750\u6599"],
      milestoneTitle: "\u8D44\u683C\u8BC4\u4F30\u4E0E\u7533\u62A5\u6750\u6599\u5DF2\u5B8C\u6210",
      milestoneDetail: "\u5BA2\u6237\u786E\u8BA4\u7533\u62A5\u6750\u6599\u540E\uFF0C\u8FDB\u5165\u6B63\u5F0F\u7533\u62A5\u4E0E\u8BC4\u5BA1\u8DDF\u8FDB\u9636\u6BB5\u3002",
      secondTrigger: "\u7533\u62A5\u6750\u6599\u5B9A\u7A3F\u5E76\u7ECF\u5BA2\u6237\u786E\u8BA4\uFF0C\u6B63\u5F0F\u7533\u62A5\u524D\u652F\u4ED8",
      secondWork: ["\u5728\u7533\u62A5\u7A97\u53E3\u5185\u6B63\u5F0F\u63D0\u4EA4", "\u8DDF\u8FDB\u5F62\u5F0F\u5BA1\u67E5\u53CA\u8865\u5145\u6750\u6599", "\u540C\u6B65\u8BC4\u5BA1\u8FDB\u5EA6\u4E0E\u6700\u7EC8\u7ED3\u679C"],
      resultTitle: "\u672C\u6B21\u7533\u62A5\u672A\u901A\u8FC7\u8BC4\u5BA1",
      resultDetail: "\u4E3B\u7BA1\u673A\u6784\u5DF2\u53D1\u5E03\u8BC4\u5BA1\u7ED3\u679C\uFF0C\u670D\u52A1\u56E2\u961F\u5B8C\u6210\u4E86\u534F\u8BAE\u7EA6\u5B9A\u7684\u8BC4\u4F30\u3001\u6750\u6599\u51C6\u5907\u3001\u7533\u62A5\u53CA\u8DDF\u8FDB\u5DE5\u4F5C\u3002",
      resultFile: "\u9879\u76EE\u8BC4\u5BA1\u7ED3\u679C\u901A\u77E5.pdf"
    }
  };
  function getStagedServiceConfig(sku) {
    if (intellectualPropertySkus.has(sku)) return { ...CONFIGS.ip, kind: "ip", sku };
    if (policySkus.has(sku)) return { ...CONFIGS.policy, kind: "policy", sku };
    return null;
  }
  function isStagedService(sku) {
    return Boolean(getStagedServiceConfig(sku));
  }
  var stagedServiceSkus = Object.freeze({
    ip: Array.from(intellectualPropertySkus),
    policy: Array.from(policySkus)
  });

  // src/services/questions.js
  function getTeamQuestions(teamId, teamList) {
    const team = getTeam(teamId, teamList);
    const base = team && team.qa ? team.qa.slice() : [];
    const stored = readJSON(STORAGE_KEYS.questions, []);
    return base.concat(stored.filter((item) => item.teamId === teamId));
  }
  function submitTeamQuestion(teamId, text) {
    const item = { teamId, q: text, a: "", tag: "\u5F85\u56E2\u961F\u56DE\u590D", pending: true };
    const stored = readJSON(STORAGE_KEYS.questions, []);
    stored.push(item);
    writeJSON(STORAGE_KEYS.questions, stored);
    return item;
  }

  // src/components/timeline.js
  var timelineIconMap = {
    sent: "send",
    accept: "check-circle",
    reject: "ban",
    choose: "users",
    message: "message",
    delivery: "file-text",
    file: "file-text",
    clock: "clock",
    done: "flag",
    review: "star",
    cancel: "x-circle",
    update: "edit",
    bell: "bell",
    plan: "file-text",
    agreement: "shield",
    refresh: "refresh"
  };
  function renderDemandTimeline(demand) {
    if (!demand) return "";
    const events = (demand.timeline || []).slice();
    let future = [];
    if (demand.status === "done") {
      future = demand.hasReview ? [] : [{ title: "\u8BC4\u4EF7\u672C\u6B21\u670D\u52A1", desc: "\u5206\u4EAB\u672C\u6B21\u670D\u52A1\u4F53\u9A8C" }];
    } else {
      future = FUTURE_STEPS[demand.status] || [];
    }
    const total = events.length + future.length;
    let position = 0;
    let html = '<div class="p6-timeline">';
    for (const event of events) {
      position += 1;
      html += '<div class="timeline-item">';
      html += '<div class="timeline-dot done"></div>';
      if (position < total) html += '<div class="timeline-line"></div>';
      html += '<div class="timeline-content">';
      html += '<div class="timeline-title">' + icon(timelineIconMap[event.kind] || "clock", 14) + " " + event.title + "</div>";
      if (event.desc) html += '<div class="timeline-desc">' + event.desc + "</div>";
      if (event.time) html += '<div class="timeline-time">' + event.time + "</div>";
      html += "</div></div>";
    }
    for (const step of future) {
      position += 1;
      html += '<div class="timeline-item pending-step">';
      html += '<div class="timeline-dot pending"></div>';
      if (position < total) html += '<div class="timeline-line"></div>';
      html += '<div class="timeline-content">';
      html += '<div class="timeline-title">' + step.title + "</div>";
      if (step.desc) html += '<div class="timeline-desc">' + step.desc + "</div>";
      html += "</div></div>";
    }
    html += "</div>";
    return html;
  }

  // src/components/matchCard.js
  function renderEvidenceRows(items, tone) {
    return (items || []).map((item) => '<div class="p5-evidence-row ' + tone + '"><span class="p5-evidence-icon">' + icon(tone === "pending" ? "help" : "check", 13) + "</span><span><strong>" + escapeHTML(item.label || "") + "</strong><small>" + escapeHTML(item.text || "") + "</small></span></div>").join("");
  }
  function renderMatchCard(result, team, options = {}) {
    const best = Boolean(options.best);
    const checked = Boolean(options.checked);
    const sku = options.sku || team.skus[0] || "\u4F01\u4E1A\u670D\u52A1";
    const relevanceEvidence = result.relevanceEvidence && result.relevanceEvidence.length ? result.relevanceEvidence : [{ label: "\u9700\u6C42\u5951\u5408", text: result.reason || "\u56E2\u961F\u80FD\u529B\u4E0E\u672C\u6B21\u9700\u6C42\u76F8\u5173" }];
    const serviceEvidence = result.serviceEvidence || [];
    const pendingEvidence = (result.pendingEvidence || []).map((text) => ({ label: "\u5F85\u786E\u8BA4", text }));
    const summary = relevanceEvidence.slice(0, 2).map((item) => item.text).join("\uFF0C");
    const legacyReason = !result.relevanceEvidence;
    const legacyReasonLong = String(result.reason || "").length > 46;
    const collapsed = legacyReason ? legacyReasonLong : !best;
    const canToggleReason = legacyReason ? legacyReasonLong : true;
    let html = '<article class="p5-match-card' + (best ? " best" : "") + '" data-team="' + escapeHTML(result.teamId) + '">';
    html += '<div class="p5-match-card-head">';
    html += '<div class="avatar avatar-sm" style="background:' + escapeHTML(team.avatarColor || "#3A6DF0") + "20;color:" + escapeHTML(team.avatarColor || "#3A6DF0") + '">' + escapeHTML(team.avatar) + "</div>";
    html += '<div class="p5-match-info"><div class="p5-match-name"><strong>' + escapeHTML(team.name) + "</strong>" + renderBadge(team.badge) + "</div>";
    html += '<div class="p5-match-org">' + escapeHTML(team.orgShort) + "</div></div>";
    if (best) html += '<span class="p5-match-badge">\u4F18\u5148\u63A8\u8350</span>';
    html += '<div class="p5-match-check ' + (checked ? "checked" : "") + '" data-team="' + escapeHTML(result.teamId) + '">';
    if (checked) html += icon("check", 14);
    html += "</div></div>";
    html += '<div class="p5-match-metrics">';
    html += "<span><strong>" + Number(team.rating || 0).toFixed(1) + "</strong>\u5206</span>";
    if (team.completedOrders) html += "<span>\u5DF2\u670D\u52A1<strong>" + team.completedOrders + "</strong>\u5355</span>";
    if (team.city) html += "<span>" + escapeHTML(team.city) + "</span>";
    if (team.avgResponse) html += "<span>" + escapeHTML(team.avgResponse) + "\u54CD\u5E94</span>";
    html += "</div>";
    html += '<div class="p5-matched-service"><span><small>\u5339\u914D\u670D\u52A1</small><strong>' + escapeHTML(sku) + "</strong></span><b>" + escapeHTML(team.priceText || "\u4EF7\u683C\u5F85\u6C9F\u901A") + "</b></div>";
    html += '<p class="p5-match-intro">' + escapeHTML(team.desc || "\u56E2\u961F\u4ECB\u7ECD\u5F85\u5B8C\u5584") + "</p>";
    html += '<section class="p5-match-reason' + (collapsed ? " is-collapsed" : "") + '">';
    html += '<div class="p5-match-reason-head"><strong>\u4E3A\u4EC0\u4E48\u63A8\u8350</strong><span>' + escapeHTML(result.matchLabel || "\u8F83\u4E3A\u5339\u914D") + "</span></div>";
    html += '<p class="p5-match-reason-summary">' + escapeHTML(summary) + "</p>";
    html += '<div class="p5-match-reason-body">';
    html += '<div class="p5-evidence-group"><h4>\u9700\u6C42\u5951\u5408</h4>' + renderEvidenceRows(relevanceEvidence, "matched") + "</div>";
    if (serviceEvidence.length) html += '<div class="p5-evidence-group"><h4>\u670D\u52A1\u8868\u73B0</h4>' + renderEvidenceRows(serviceEvidence, "trusted") + "</div>";
    if (pendingEvidence.length) html += '<div class="p5-evidence-group p5-evidence-pending"><h4>\u6C9F\u901A\u65F6\u786E\u8BA4</h4>' + renderEvidenceRows(pendingEvidence, "pending") + "</div>";
    html += "</div>";
    if (canToggleReason) html += '<button type="button" data-p5-match-action="reason" aria-expanded="' + (collapsed ? "false" : "true") + '">' + (collapsed ? "\u5C55\u5F00\u4F9D\u636E " : "\u6536\u8D77\u5339\u914D\u4F9D\u636E ") + icon("chevron-down", 13) + "</button>";
    html += "</section>";
    html += '<div class="p5-match-links"><button type="button" data-p5-match-action="team-detail">\u67E5\u770B\u56E2\u961F\u8BE6\u60C5</button><button type="button" data-p5-match-action="service-detail">\u67E5\u770B\u670D\u52A1\u8BE6\u60C5</button></div>';
    html += "</article>";
    return html;
  }

  // src/pages/p5-dialog/MatchResults.js
  function renderMatchResults(page14, results, findTeam) {
    const conditions = [page14.resolveSku(), page14.collected.city, page14.collected.budget].filter((item) => item && item !== "\u672A\u63D0\u4F9B");
    let html = '<div class="p5-match-results">';
    html += '<section class="p5-match-summary">';
    html += '<div class="p5-match-summary-head"><span><strong>\u4E3A\u4F60\u63A8\u8350' + results.length + "\u5BB6\u670D\u52A1\u56E2\u961F</strong><small>\u7EFC\u5408\u9700\u6C42\u5951\u5408\u5EA6\u4E0E\u56E2\u961F\u670D\u52A1\u8868\u73B0\u6392\u5E8F</small></span>";
    html += '<button type="button" data-p5-match-action="summary">\u8C03\u6574\u6761\u4EF6</button></div>';
    html += '<div class="p5-match-condition-list">';
    conditions.forEach((item) => {
      html += "<span>" + escapeHTML(item) + "</span>";
    });
    html += "</div>";
    html += '<div class="p5-match-trust">' + icon("shield", 15) + "<span>\u4EE5\u4E0B\u56E2\u961F\u5747\u5DF2\u901A\u8FC7\u5E73\u53F0\u8D44\u8D28\u6838\u9A8C</span></div>";
    html += "</section>";
    html += '<div class="p5-match-list-head"><strong>\u8BF7\u9009\u62E9\u60F3\u6C9F\u901A\u7684\u56E2\u961F</strong><span>\u53EF\u591A\u9009</span></div>';
    if (!results.length) {
      html += '<div class="p5-match-empty">' + icon("search", 36) + "<strong>\u6682\u672A\u627E\u5230\u5B8C\u5168\u7B26\u5408\u7684\u56E2\u961F</strong><span>\u5E73\u53F0\u4F1A\u7EE7\u7EED\u5BFB\u627E\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u8C03\u6574\u9700\u6C42\u6216\u6309\u7C7B\u76EE\u67E5\u627E\u3002</span></div>";
    }
    results.forEach((result, index) => {
      const team = findTeam(result.teamId);
      if (!team) return;
      html += renderMatchCard(result, team, {
        best: index === 0,
        checked: Boolean(page14.checkedTeams[result.teamId]),
        sku: page14.resolveSku()
      });
    });
    html += '<div class="p5-match-alternatives">';
    if (results.length) html += '<button class="p5-change-batch" type="button" data-p5-match-action="batch">' + icon("refresh", 14) + " \u6362\u4E00\u6279\u63A8\u8350</button>";
    html += '<button class="p5-category-link" type="button" data-p5-match-action="category">\u90FD\u4E0D\u5408\u9002\uFF1F\u6309\u7C7B\u76EE\u67E5\u627E ' + icon("chevron-right", 13) + "</button>";
    html += "</div>";
    html += "</div>";
    const checkedCount = Object.keys(page14.checkedTeams).filter((teamId) => page14.checkedTeams[teamId]).length;
    html += '<div class="bottom-bar">';
    html += results.length ? '<button class="btn btn-primary btn-block" type="button" data-p5-match-action="submit">\u5411' + checkedCount + "\u5BB6\u56E2\u961F\u53D1\u9001\u9700\u6C42</button>" : '<button class="btn btn-outline btn-block" type="button" data-p5-match-action="summary">\u8FD4\u56DE\u8C03\u6574\u9700\u6C42</button>';
    html += "</div>";
    return html;
  }
  function bindMatchResults(page14) {
    document.querySelectorAll(".p5-match-card").forEach((card) => {
      card.addEventListener("click", (event) => {
        if (event.target.closest("[data-p5-match-action]")) return;
        page14.toggleCheck(card.getAttribute("data-team"));
      });
    });
    document.querySelectorAll('[data-p5-match-action="reason"]').forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        page14.toggleReason(button);
      });
    });
    document.querySelectorAll('[data-p5-match-action="team-detail"]').forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        page14.openMatchTeamDetail(button.closest(".p5-match-card").getAttribute("data-team"));
      });
    });
    document.querySelectorAll('[data-p5-match-action="service-detail"]').forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        page14.openMatchServiceDetail(button.closest(".p5-match-card").getAttribute("data-team"));
      });
    });
    const batchButton = document.querySelector('[data-p5-match-action="batch"]');
    if (batchButton) batchButton.addEventListener("click", () => page14.changeBatch());
    const categoryButton = document.querySelector('[data-p5-match-action="category"]');
    if (categoryButton) categoryButton.addEventListener("click", () => navigateTo("p2", { categoryId: page14.params.categoryId || "law" }));
    const summaryButton = document.querySelector('[data-p5-match-action="summary"]');
    if (summaryButton) summaryButton.addEventListener("click", () => page14.returnToSummary());
    const submitButton = document.querySelector('[data-p5-match-action="submit"]');
    if (submitButton) submitButton.addEventListener("click", () => page14.showSuccess());
  }

  // src/pages/p5-dialog/MatchingProgress.js
  var steps = [
    "\u7406\u89E3\u672C\u6B21\u670D\u52A1\u9700\u6C42",
    "\u7B5B\u9009\u53EF\u627F\u63A5\u7684\u670D\u52A1\u56E2\u961F",
    "\u6838\u5BF9\u76F8\u5173\u6848\u4F8B\u4E0E\u670D\u52A1\u8868\u73B0"
  ];
  function conditionItems(page14) {
    const items = [
      ["\u5339\u914D\u670D\u52A1", page14.resolveSku()],
      ["\u6240\u5728\u5730\u533A", page14.collected.city],
      ["\u9884\u7B97\u8303\u56F4", page14.collected.budget]
    ];
    return items.filter((item) => item[1] && item[1] !== "\u672A\u63D0\u4F9B");
  }
  function renderMatchingProgress(page14, activeStep = 0) {
    let html = '<main class="p5-matching" role="status" aria-live="polite">';
    html += '<div class="p5-matching-orbit" aria-hidden="true"><span></span><span></span><span></span></div>';
    html += "<h1>\u6B63\u5728\u4E3A\u4F60\u7CBE\u51C6\u5339\u914D</h1>";
    html += '<p class="p5-matching-lead">\u7EFC\u5408\u9700\u6C42\u5951\u5408\u5EA6\u3001\u7528\u6237\u8BC4\u4EF7\u548C\u5E73\u53F0\u670D\u52A1\u8BB0\u5F55\uFF0C\u4E3A\u4F60\u7B5B\u9009\u5408\u9002\u7684\u670D\u52A1\u56E2\u961F\u3002</p>';
    html += '<div class="p5-matching-conditions">';
    conditionItems(page14).forEach((item) => {
      html += "<span><small>" + escapeHTML(item[0]) + "</small><strong>" + escapeHTML(item[1]) + "</strong></span>";
    });
    html += "</div>";
    html += '<div class="p5-matching-progress"><span style="transform:scaleX(' + (activeStep + 1) / steps.length + ')"></span></div>';
    html += '<ol class="p5-matching-steps">';
    steps.forEach((label, index) => {
      const state2 = index < activeStep ? " is-done" : index === activeStep ? " is-active" : "";
      html += '<li class="' + state2.trim() + '" data-matching-step="' + index + '"><i aria-hidden="true"></i><span>' + label + "</span></li>";
    });
    html += "</ol>";
    html += '<p class="p5-matching-footnote">\u5339\u914D\u5B8C\u6210\u540E\u5C06\u76F4\u63A5\u5C55\u793A\u63A8\u8350\u56E2\u961F</p>';
    html += "</main>";
    return html;
  }
  function updateMatchingProgress(activeStep) {
    const progress2 = document.querySelector(".p5-matching-progress span");
    if (progress2) progress2.style.transform = "scaleX(" + (activeStep + 1) / steps.length + ")";
    document.querySelectorAll("[data-matching-step]").forEach((item) => {
      const index = Number(item.getAttribute("data-matching-step"));
      item.classList.toggle("is-done", index < activeStep);
      item.classList.toggle("is-active", index === activeStep);
    });
  }

  // src/pages/p5-dialog/SummaryCard.js
  function renderSummaryCard(page14) {
    const collected = page14.collected;
    const value = (key) => collected[key] && collected[key] !== "\u672A\u63D0\u4F9B" ? collected[key] : "";
    const sku = page14.resolveSku();
    const fieldGroups = [
      {
        title: "\u6838\u5FC3\u9700\u6C42",
        fields: page14.summaryFields.filter((field) => ["issue", "budget", "timeline", "city"].includes(field.key))
      },
      {
        title: "\u8865\u5145\u4FE1\u606F",
        fields: page14.summaryFields.filter((field) => ["skuSpecific", "extra"].includes(field.key))
      }
    ];
    let html = '<div class="chat-msg-row ai p5-confirmation-row"><div class="chat-avatar p5-avatar">' + icon("file-text", 18) + '</div><article class="p5-confirmation-card">';
    if (page14.resubmitFrom) {
      html += '<div class="p5-confirmation-note">\u5DF2\u5E26\u5165\u539F\u9700\u6C42\u300C' + page14.resubmitTitle + "\u300D\u7684\u4FE1\u606F</div>";
    }
    html += '<div class="p5-summary-title"><span>\u672C\u6B21\u5339\u914D\u6761\u4EF6</span><small>\u8BF7\u786E\u8BA4\u540E\u5F00\u59CB\u5339\u914D</small></div>';
    html += '<div class="p5-summary-desc">' + user.company + "\u9700\u8981" + (sku === "\u7EFC\u5408\u670D\u52A1" ? "\u4F01\u4E1A\u670D\u52A1\u652F\u6301" : sku + "\u670D\u52A1") + "\u3002\u5E73\u53F0\u4F1A\u7EFC\u5408\u9700\u6C42\u5951\u5408\u5EA6\u4E0E\u56E2\u961F\u670D\u52A1\u8868\u73B0\u8FDB\u884C\u63A8\u8350\u3002</div>";
    html += '<div class="p5-summary-groups">';
    fieldGroups.forEach((group) => {
      const availableCount = group.fields.filter((field) => value(field.key)).length;
      html += '<section class="p5-summary-group"><div class="p5-summary-group-head"><strong>' + group.title + "</strong><span>" + availableCount + "/" + group.fields.length + '\u9879\u5DF2\u786E\u8BA4</span></div><div class="p5-summary-fields">';
      group.fields.forEach((field) => {
        const fieldValue = value(field.key);
        html += '<div class="p5-summary-field">';
        html += '<span class="p5-summary-field-label">' + field.label + "</span>";
        if (page14.editMode) {
          if (field.key === "issue") {
            html += '<select class="p5-summary-input p5-summary-select" data-field="issue">';
            page14.getKnownSkuOptions().forEach((option) => {
              html += '<option value="' + escapeHTML(option) + '"' + (option === fieldValue ? " selected" : "") + ">" + escapeHTML(option) + "</option>";
            });
            html += "</select>";
          } else {
            html += '<input class="p5-summary-input" data-field="' + field.key + '" value="' + escapeHTML(fieldValue) + '" placeholder="\u672A\u586B\u5199">';
          }
        } else {
          html += '<span class="p5-summary-field-value' + (fieldValue ? "" : " missing") + '">' + escapeHTML(fieldValue || "\u672A\u63D0\u4F9B") + "</span>";
        }
        html += "</div>";
      });
      html += "</div></section>";
    });
    html += "</div>";
    html += '<div class="p5-confirmation-actions">';
    if (page14.editMode) {
      html += '<button class="btn btn-primary btn-block" type="button" data-p5-summary-action="save">\u4FDD\u5B58\u4FEE\u6539</button>';
    } else {
      html += '<button class="btn btn-outline" type="button" data-p5-summary-action="edit">\u4FEE\u6539\u4FE1\u606F</button><button class="btn btn-primary" type="button" data-p5-summary-action="match">\u786E\u8BA4\u5E76\u5F00\u59CB\u5339\u914D</button>';
    }
    html += "</div></article></div>";
    return html;
  }
  function bindSummaryCard(page14) {
    const editButton = document.querySelector('[data-p5-summary-action="edit"]');
    if (editButton) editButton.addEventListener("click", () => page14.toggleEdit());
    const saveButton = document.querySelector('[data-p5-summary-action="save"]');
    if (saveButton) saveButton.addEventListener("click", () => page14.saveSummaryEdit());
    const matchButton = document.querySelector('[data-p5-summary-action="match"]');
    if (matchButton) matchButton.addEventListener("click", () => page14.showMatch());
  }

  // src/pages/p5-dialog/SuccessView.js
  function renderSuccessResponseSummary(demand) {
    const accepted = (demand.accepted || []).length;
    const waiting = (demand.pending || []).length;
    const total = demand.totalInvited || accepted + waiting + (demand.rejected || []).length + (demand.timedOut || []).length;
    const title = demand.responseClosed ? "\u672C\u8F6E\u54CD\u5E94\u5DF2\u7ED3\u675F" : accepted > 0 ? "\u5DF2\u6709 " + accepted + " \u5BB6\u56E2\u961F\u54CD\u5E94" : "\u56E2\u961F\u6B63\u5728\u54CD\u5E94";
    const meta = demand.responseClosed ? accepted > 0 ? "\u53EF\u4EE5\u67E5\u770B\u5DF2\u54CD\u5E94\u56E2\u961F\u5E76\u8865\u5145\u57FA\u7840\u4FE1\u606F" : "\u672C\u8F6E\u6682\u65E0\u56E2\u961F\u627F\u63A5\uFF0C\u53EF\u91CD\u65B0\u53D1\u5E03\u6216\u8C03\u6574\u9700\u6C42" : accepted > 0 ? "\u53EF\u4EE5\u5148\u67E5\u770B\u56E2\u961F\u56DE\u590D\uFF0C\u5176\u4ED6\u56E2\u961F\u4ECD\u5728\u54CD\u5E94\u4E2D" : "\u672C\u8F6E\u5C06\u5728" + demand.responseDeadline + "\u622A\u6B62\uFF0C\u65E0\u9700\u505C\u7559\u5728\u5F53\u524D\u9875\u9762";
    return '<div class="p5-success-response-head"><strong>' + title + "</strong><span>" + accepted + "/" + total + ' \u5BB6</span></div><div class="p5-success-response-meta">' + meta + "</div>";
  }
  function renderSuccessNext(demand) {
    const accepted = (demand.accepted || []).length;
    const responseComplete = Boolean(demand.responseClosed);
    let html = "<h2>\u63A5\u4E0B\u6765</h2><ol>";
    html += '<li class="' + (responseComplete || accepted ? "done" : "active") + '"><span>' + icon(responseComplete || accepted ? "check" : "clock", 14) + "</span><div><strong>\u7B49\u5F85\u56E2\u961F\u54CD\u5E94</strong><small>\u5E73\u53F0\u6301\u7EED\u6C47\u603B\u672C\u8F6E\u56E2\u961F\u53CD\u9988</small></div></li>";
    html += '<li class="' + (accepted ? "active" : "") + '"><span>' + icon(accepted ? "message" : "file-text", 14) + "</span><div><strong>\u5E73\u53F0\u52A9\u624B\u786E\u8BA4\u57FA\u7840\u4FE1\u606F</strong><small>\u65B9\u6848\u548C\u62A5\u4EF7\u4EE5\u5361\u7247\u5F62\u5F0F\u63A8\u9001\uFF0C\u4E0D\u5F00\u653E\u771F\u4EBA\u5B9E\u65F6\u804A\u5929</small></div></li>";
    html += "<li><span>" + icon("users", 14) + "</span><div><strong>\u4F01\u4E1A\u5FAE\u4FE1\u62C9\u7FA4\u6DF1\u5165\u6C9F\u901A</strong><small>\u9700\u8981\u4E13\u4E1A\u4EA4\u6D41\u65F6\uFF0C\u7531\u5E73\u53F0\u987E\u95EE\u534F\u52A9\u5EFA\u8054</small></div></li>";
    return html + "</ol>";
  }
  function renderSuccessView(demand) {
    let html = '<div class="p5-success">';
    html += '<header class="p5-success-hero"><span class="p5-success-check">' + icon("check-circle", 34) + '</span><div><div class="p5-success-title">\u9700\u6C42\u5DF2\u53D1\u5E03</div><div class="p5-success-desc">\u4F60\u53EF\u4EE5\u5148\u79BB\u5F00\uFF0C\u6709\u56E2\u961F\u54CD\u5E94\u6216\u670D\u52A1\u8FDB\u5C55\u65F6\u6211\u4EEC\u4F1A\u4E3B\u52A8\u901A\u77E5\u3002</div></div></header>';
    html += '<main class="p5-success-main"><section class="p5-success-response" id="p5SuccessResponse">' + renderSuccessResponseSummary(demand) + "</section>";
    html += '<section class="p5-success-next" id="p5SuccessNext">' + renderSuccessNext(demand) + "</section>";
    html += '<button class="p5-wecom-card" id="p5WecomCard">' + renderWecomCard() + "</button></main>";
    html += '<footer class="p5-success-footer"><div class="p5-success-actions">';
    html += '<button class="btn btn-primary btn-block" id="p5SuccessPrimary">\u67E5\u770B\u9700\u6C42\u8FDB\u5EA6</button>';
    html += '<button class="p5-success-home" id="p5SuccessHome">\u8FD4\u56DE\u751F\u6001\u9996\u9875</button>';
    html += '</div><details class="p5-progress-details"><summary>\u67E5\u770B\u5B8C\u6574\u8FDB\u5EA6 ' + icon("chevron-right", 15) + '</summary><div class="p5-timeline-card">' + renderDemandTimeline(demand) + "</div></details></footer>";
    html += "</div>";
    return html;
  }
  function bindSuccessView(demand) {
    document.getElementById("p5WecomCard").addEventListener("click", () => openWecomGuide());
    document.getElementById("p5SuccessHome").addEventListener("click", () => switchToTab("ecology"));
    document.getElementById("p5SuccessPrimary").addEventListener("click", () => {
      const hasResponses = (demand.accepted || []).length > 0;
      navigateTo("p6", { demandId: demand.id, tab: hasResponses ? "accepted" : "progress" });
    });
  }
  function refreshSuccessPrimary(demand) {
    const button = document.getElementById("p5SuccessPrimary");
    if (!button) return;
    button.textContent = (demand.accepted || []).length > 0 ? "\u67E5\u770B\u54CD\u5E94\u56E2\u961F" : "\u67E5\u770B\u9700\u6C42\u8FDB\u5EA6";
  }

  // src/pages/p5-dialog/steps.js
  var issueOptions = ["\u80A1\u6743\u878D\u8D44", "\u5408\u540C\u5BA1\u67E5", "\u516C\u53F8\u6CE8\u518C/\u53D8\u66F4", "\u77E5\u8BC6\u4EA7\u6743", "\u52B3\u52A8\u5408\u89C4", "\u5176\u4ED6"];
  var budgetOptions = ["1\u4E07\u4EE5\u4E0B", "1-3\u4E07", "3-5\u4E07", "5\u4E07\u4EE5\u4E0A", "\u4E0D\u786E\u5B9A\uFF0C\u542C\u670D\u52A1\u5546\u5EFA\u8BAE", "\u5148\u8DF3\u8FC7"];
  var timelineOptions = ["1\u5468\u5185", "2\u5468\u5185", "1\u4E2A\u6708\u5185", "\u4E0D\u7740\u6025", "\u5148\u8DF3\u8FC7"];
  var specificOptions = {
    "\u80A1\u6743\u878D\u8D44": ["\u9996\u8F6E\u878D\u8D44", "\u5DF2\u6709\u5916\u90E8\u80A1\u4E1C", "\u4E0D\u786E\u5B9A", "\u5148\u8DF3\u8FC7"],
    "\u5408\u540C\u5BA1\u67E5": ["\u5DF2\u6709\u5408\u540C\u8981\u5BA1", "\u9700\u8981\u4ECE\u5934\u8D77\u8349", "\u5176\u4ED6", "\u5148\u8DF3\u8FC7"],
    "\u516C\u53F8\u6CE8\u518C/\u53D8\u66F4": ["\u65B0\u8BBE\u516C\u53F8", "\u5DE5\u5546\u53D8\u66F4", "\u516C\u53F8\u6CE8\u9500", "\u5176\u4ED6"],
    "\u77E5\u8BC6\u4EA7\u6743": ["\u5546\u6807", "\u4E13\u5229", "\u8457\u4F5C\u6743", "\u5176\u4ED6", "\u5148\u8DF3\u8FC7"],
    "\u52B3\u52A8\u5408\u89C4": ["\u5BA1\u5408\u540C/\u5236\u5EA6", "\u52B3\u52A8\u4E89\u8BAE", "\u5176\u4ED6", "\u5148\u8DF3\u8FC7"]
  };
  var specificQuestions = {
    "\u80A1\u6743\u878D\u8D44": "\u662F\u9996\u8F6E\u878D\u8D44\uFF0C\u8FD8\u662F\u4E4B\u524D\u5DF2\u6709\u8FC7\u80A1\u6743\u53D8\u52A8\uFF1F",
    "\u5408\u540C\u5BA1\u67E5": "\u662F\u5DF2\u6709\u5408\u540C\u8981\u5BA1\uFF0C\u8FD8\u662F\u9700\u8981\u4ECE\u5934\u8D77\u8349\uFF1F",
    "\u516C\u53F8\u6CE8\u518C/\u53D8\u66F4": "\u4F60\u8981\u529E\u7406\u65B0\u8BBE\u3001\u53D8\u66F4\u8FD8\u662F\u6CE8\u9500\uFF1F",
    "\u77E5\u8BC6\u4EA7\u6743": "\u4E3B\u8981\u6D89\u53CA\u5546\u6807\u3001\u4E13\u5229\u8FD8\u662F\u8457\u4F5C\u6743\uFF1F",
    "\u52B3\u52A8\u5408\u89C4": "\u662F\u9700\u8981\u5BA1\u5408\u540C/\u5236\u5EA6\uFF0C\u8FD8\u662F\u5904\u7406\u52B3\u52A8\u4E89\u8BAE\uFF1F"
  };
  var dialogSteps = Object.freeze([
    {
      number: 1,
      key: "issue",
      question: () => "\u4F60\u8FD9\u6B21\u9700\u8981\u54EA\u65B9\u9762\u7684\u4F01\u4E1A\u670D\u52A1\uFF1F",
      quickOptions: () => issueOptions,
      onAnswer: (_page, skipped) => skipped ? "budget" : "skuSpecific"
    },
    {
      number: 2,
      key: "skuSpecific",
      question: (page14) => specificQuestions[page14.collected.issue] || "",
      quickOptions: (page14) => specificOptions[page14.collected.issue] || ["\u5148\u8DF3\u8FC7"],
      onAnswer: () => "budget"
    },
    {
      number: 3,
      key: "budget",
      question: () => "\u4F60\u7684\u9884\u7B97\u8303\u56F4\u5927\u6982\u662F\u591A\u5C11\uFF1F",
      quickOptions: () => budgetOptions,
      onAnswer: () => "timeline"
    },
    {
      number: 4,
      key: "timeline",
      question: () => "\u671F\u671B\u4EC0\u4E48\u65F6\u5019\u5B8C\u6210\uFF1F",
      quickOptions: () => timelineOptions,
      onAnswer: () => "extra"
    },
    {
      number: 5,
      key: "extra",
      question: () => "\u8FD8\u6709\u4EC0\u4E48\u60F3\u544A\u8BC9\u670D\u52A1\u56E2\u961F\u7684\uFF1F\u8BF4\u8BF4\u4F60\u7684\u60C5\u51B5\u3001\u5361\u5728\u54EA\u3001\u60F3\u8FBE\u5230\u4EC0\u4E48\u6548\u679C\u3002",
      quickOptions: () => [],
      onAnswer: () => "summary"
    }
  ]);
  function getDialogStep(numberOrKey) {
    return dialogSteps.find((step) => step.number === numberOrKey || step.key === numberOrKey) || null;
  }
  function applyStepAnswer(page14, value, skipped = false) {
    const step = getDialogStep(page14.step);
    if (!step) return "issue";
    page14.collected[step.key] = value;
    return step.onAnswer(page14, skipped);
  }

  // src/pages/p5-dialog/index.js
  var DRAFT_KEY = "ecologyDemandInputDraft";
  var shellHost = { clearPageAction, mountPageAction };
  function domainOptions2() {
    return {
      categories,
      chatMessages: store.chatMessages,
      demands: store.demands,
      teams: store.teams,
      user,
      nowLabel,
      todayLabel,
      responseDeadlineLabel,
      isWecomAdded
    };
  }
  function renderPageContent(html, pageId) {
    return setPageContent.call(shellHost, html, pageId);
  }
  function askStep(stepKey) {
    const step = getDialogStep(stepKey);
    if (!step) return;
    page3.step = step.number;
    const question = step.question(page3);
    if (!question) {
      askStep("budget");
      return;
    }
    page3.showTypingThen(() => page3.addMessage("ai", question));
  }
  function queueNextStep(nextStep) {
    setTimeout(() => {
      if (nextStep === "summary") page3.showSummary();
      else askStep(nextStep);
    }, 400);
  }
  function completeCurrentStep(value, skipped, addUserMessage, displayValue) {
    if (addUserMessage) page3.addMessage("user", displayValue || value);
    const nextStep = applyStepAnswer(page3, value, skipped);
    queueNextStep(nextStep);
  }
  function bindChatContent() {
    document.querySelectorAll("#p5QuickOptions .quick-option").forEach((option) => {
      option.addEventListener("click", () => page3.selectQuickOption(option.getAttribute("data-val")));
    });
    const finishButton = document.getElementById("p5FinishExtra");
    if (finishButton) finishButton.addEventListener("click", () => page3.finishExtra());
    if (page3.state === "summary") bindSummaryCard(page3);
  }
  function toggleTeamFromDetail(teamId) {
    page3.checkedTeams[teamId] = !page3.checkedTeams[teamId];
  }
  var page3 = {
    state: "chat",
    step: 0,
    messages: [],
    collected: {
      issue: "",
      skuSpecific: "",
      budget: "",
      timeline: "",
      city: user.city + "\xB7" + user.district,
      extra: ""
    },
    checkedTeams: {},
    currentBatch: 0,
    shownTeamIds: [],
    createdDemandId: null,
    editMode: false,
    resubmitFrom: null,
    resubmitTitle: "",
    wecomPrompted: false,
    matchingTimers: [],
    render(params) {
      const resumeMatch = params && params.resumeMatch && this.state === "match";
      if (resumeMatch) return this.renderMatchHTML(this.getCurrentResults());
      this.reset(params);
      return this.renderConversationShell();
    },
    renderConversationShell() {
      let html = '<div class="nav-bar">';
      html += '<button class="nav-back" id="p5Back">' + icon("chevron-left", 22) + "</button>";
      html += '<div class="nav-title">\u53D1\u5E03\u9700\u6C42</div>';
      html += '<div style="width:32px"></div>';
      html += "</div>";
      html += '<div id="p5ChatArea" class="p5-chat-area"></div>';
      html += '<div id="p5InputBar" class="p5-input-bar">';
      html += '<input type="text" id="p5Input" placeholder="\u8F93\u5165\u4F60\u7684\u56DE\u7B54\u2026">';
      html += '<button class="p5-send-btn" id="p5Send" type="button">' + icon("send", 15) + "</button>";
      html += "</div>";
      return html;
    },
    bindConversationShell() {
      const backButton = document.getElementById("p5Back");
      if (backButton) backButton.addEventListener("click", goBackToPrevious);
      const input = document.getElementById("p5Input");
      const sendButton = document.getElementById("p5Send");
      if (sendButton) sendButton.addEventListener("click", () => this.sendInput());
      if (input) {
        input.addEventListener("keydown", (event) => {
          if (event.key === "Enter") this.sendInput();
        });
        input.value = readText(DRAFT_KEY, "") || "";
        input.addEventListener("input", function() {
          writeText(DRAFT_KEY, this.value);
        });
      }
    },
    reset(params) {
      this.clearMatchingTimers();
      this.params = params || {};
      this.state = "chat";
      this.step = 0;
      this.messages = [];
      this.collected = {
        issue: this.params.sku || "",
        skuSpecific: "",
        budget: "",
        timeline: "",
        city: user.city + "\xB7" + user.district,
        extra: ""
      };
      this.checkedTeams = {};
      this.currentBatch = 0;
      this.shownTeamIds = [];
      this.createdDemandId = null;
      this.editMode = false;
      this.resubmitFrom = null;
      this.resubmitTitle = "";
      this.wecomPrompted = false;
    },
    prefillFrom(demand) {
      const get2 = (label) => {
        const field = (demand.fields || []).find((item) => item.label === label);
        return field ? field.value : "";
      };
      this.collected.issue = get2("\u670D\u52A1\u7C7B\u578B") || demand.sku || "";
      this.collected.skuSpecific = get2("\u5173\u952E\u4FE1\u606F") || "";
      this.collected.budget = get2("\u9884\u7B97\u8303\u56F4") || demand.budget || "";
      this.collected.timeline = get2("\u671F\u671B\u5B8C\u6210\u65F6\u95F4") || "";
      this.collected.city = get2("\u5B9E\u9645\u529E\u516C\u57CE\u5E02") || user.city + "\xB7" + user.district;
      this.collected.extra = get2("\u8865\u5145\u63CF\u8FF0") || demand.desc || "";
      this.params.sku = demand.sku;
      this.params.categoryId = demand.categoryId;
      this.resubmitFrom = demand.id;
      this.resubmitTitle = demand.title;
    },
    init(params) {
      showTabBar(false);
      if (params && params.resumeMatch && this.state === "match") {
        bindMatchResults(this);
        return;
      }
      this.reset(params);
      this.bindConversationShell();
      const sourceDemand = this.params.demandId ? getDemand(this.params.demandId, store.demands) : null;
      if (sourceDemand) {
        this.prefillFrom(sourceDemand);
        this.showSummary();
        return;
      }
      this.addMessage(
        "greeting",
        "\u4E3A\u4E86\u5E2E\u4F60\u5339\u914D\u5408\u9002\u7684\u670D\u52A1\u56E2\u961F\uFF0C\u9700\u8981\u5148\u786E\u8BA4\u51E0\u9879\u57FA\u672C\u4FE1\u606F\u3002\u5DF2\u5E26\u5165\u4F01\u4E1A\u8D44\u6599\uFF1A" + user.company + "\uFF0C" + user.city + "\u3002"
      );
      if (this.params.sku) {
        this.addMessage("ai", "\u5DF2\u9009\u62E9\u201C" + this.params.sku + "\u201D\uFF0C\u63A5\u4E0B\u6765\u786E\u8BA4\u9884\u7B97\u548C\u65F6\u95F4\u3002");
        setTimeout(() => this.askBudget(), 500);
      } else {
        setTimeout(() => this.askIssue(), 800);
      }
    },
    addMessage(type, text) {
      this.messages.push({ type, text });
      this.renderChat();
    },
    renderChat() {
      if (this.state !== "chat" && this.state !== "summary") return;
      const container = document.getElementById("p5ChatArea");
      if (!container) return;
      let html = "";
      this.messages.forEach((message) => {
        if (message.type === "greeting") {
          html += '<div class="p5-greeting"><div class="p5-greeting-text">' + message.text + "</div></div>";
        } else if (message.type === "ai") {
          html += '<div class="chat-msg-row ai"><div class="chat-avatar p5-avatar">' + icon("file-text", 18) + '</div><div class="chat-bubble chat-bubble-ai">' + message.text + "</div></div>";
        } else if (message.type === "user") {
          html += '<div class="chat-msg-row user"><div class="chat-bubble chat-bubble-user">' + message.text + "</div></div>";
        } else if (message.type === "typing") {
          html += '<div class="chat-msg-row ai" id="p5Typing"><div class="chat-avatar p5-avatar">' + icon("file-text", 18) + '</div><div class="p5-typing"><div class="p5-typing-dot"></div><div class="p5-typing-dot"></div><div class="p5-typing-dot"></div></div></div>';
        }
      });
      const options = this.state === "chat" ? this.getQuickOptions() : [];
      if (options.length > 0) {
        html += '<div class="quick-options" id="p5QuickOptions">';
        options.forEach((option) => {
          const escaped = escapeHTML(option);
          html += '<div class="quick-option" data-val="' + escaped + '">' + escaped + "</div>";
        });
        html += "</div>";
      }
      if (this.state === "chat" && this.step === 5) {
        html += '<button class="p5-finish-extra" id="p5FinishExtra" type="button">\u6CA1\u6709\u4E86\uFF0C\u5E2E\u6211\u5339\u914D\u5408\u9002\u7684\u670D\u52A1\u56E2\u961F ' + icon("arrow-right", 14) + "</button>";
      }
      if (this.state === "summary") html += this.renderSummaryCard();
      container.innerHTML = html;
      container.scrollTop = container.scrollHeight;
      bindChatContent();
    },
    getQuickOptions() {
      const step = getDialogStep(this.step);
      return step ? step.quickOptions(this) : [];
    },
    showTypingThen(callback, delay) {
      const visibleDelay = delay || 800;
      this.addMessage("typing", "");
      setTimeout(() => {
        this.messages = this.messages.filter((message) => message.type !== "typing");
        this.renderChat();
        callback();
      }, visibleDelay);
    },
    askIssue() {
      askStep("issue");
    },
    askSkuSpecific() {
      askStep("skuSpecific");
    },
    askBudget() {
      askStep("budget");
    },
    askTimeline() {
      askStep("timeline");
    },
    askExtra() {
      askStep("extra");
    },
    selectQuickOption(value) {
      if (value === "\u8DF3\u8FC7\u8FD9\u6B65" || value === "\u5148\u8DF3\u8FC7") {
        this.skipCurrentStep();
        return;
      }
      completeCurrentStep(value, false, true);
    },
    sendInput() {
      const input = document.getElementById("p5Input");
      if (!input || !input.value.trim()) return;
      const text = input.value.trim();
      input.value = "";
      removeValue(DRAFT_KEY);
      this.addMessage("user", text);
      if (getDialogStep(this.step)) completeCurrentStep(text, false, false);
      else setTimeout(() => this.askIssue(), 400);
    },
    finishExtra() {
      this.collected.extra = "\u672A\u63D0\u4F9B";
      this.showSummary();
    },
    skipCurrentStep() {
      const displayValue = this.step === 5 ? "\u8DF3\u8FC7\u8FD9\u6B65" : "\u5148\u8DF3\u8FC7";
      completeCurrentStep("\u672A\u63D0\u4F9B", true, true, displayValue);
    },
    skuMap: {
      "\u80A1\u6743\u878D\u8D44": { "\u9996\u8F6E\u878D\u8D44": "\u878D\u8D44\u4EA4\u6613", "\u5DF2\u6709\u5916\u90E8\u80A1\u4E1C": "\u80A1\u6743\u67B6\u6784\u8BBE\u8BA1", "\u4E0D\u786E\u5B9A": "\u878D\u8D44\u4EA4\u6613", "default": "\u878D\u8D44\u4EA4\u6613" },
      "\u5408\u540C\u5BA1\u67E5": { "\u5DF2\u6709\u5408\u540C\u8981\u5BA1": "\u5408\u540C\u5BA1\u67E5", "\u9700\u8981\u4ECE\u5934\u8D77\u8349": "\u5408\u540C\u5BA1\u67E5", "default": "\u5408\u540C\u5BA1\u67E5" },
      "\u516C\u53F8\u6CE8\u518C/\u53D8\u66F4": { "\u65B0\u8BBE\u516C\u53F8": "\u516C\u53F8\u6CE8\u518C", "\u5DE5\u5546\u53D8\u66F4": "\u5DE5\u5546\u53D8\u66F4", "\u516C\u53F8\u6CE8\u9500": "\u516C\u53F8\u6CE8\u9500", "default": "\u516C\u53F8\u6CE8\u518C" },
      "\u77E5\u8BC6\u4EA7\u6743": { "\u5546\u6807": "\u5546\u6807\u6CE8\u518C", "\u4E13\u5229": "\u4E13\u5229\u7533\u8BF7", "\u8457\u4F5C\u6743": "\u8457\u4F5C\u6743\u767B\u8BB0", "default": "\u5546\u6807\u6CE8\u518C" },
      "\u52B3\u52A8\u5408\u89C4": { "\u5BA1\u5408\u540C/\u5236\u5EA6": "\u52B3\u52A8\u5408\u89C4", "\u52B3\u52A8\u4E89\u8BAE": "\u52B3\u52A8\u5408\u89C4", "default": "\u52B3\u52A8\u5408\u89C4" }
    },
    resolveSku() {
      if (this.params.sku && isKnownSku(this.params.sku, categories)) return this.params.sku;
      const issue = this.collected.issue === "\u672A\u63D0\u4F9B" ? "" : this.collected.issue || "";
      const mapping = this.skuMap[issue];
      if (mapping) return mapping[this.collected.skuSpecific] || mapping.default;
      if (isKnownSku(issue, categories)) return issue;
      const raw = this.params.sku && this.params.sku !== "\u672A\u63D0\u4F9B" ? this.params.sku : "";
      return raw || issue || "\u7EFC\u5408\u670D\u52A1";
    },
    summaryFields: [
      { key: "issue", label: "\u670D\u52A1\u7C7B\u578B" },
      { key: "skuSpecific", label: "\u5173\u952E\u4FE1\u606F" },
      { key: "budget", label: "\u9884\u7B97\u8303\u56F4" },
      { key: "timeline", label: "\u671F\u671B\u5B8C\u6210\u65F6\u95F4" },
      { key: "city", label: "\u5B9E\u9645\u529E\u516C\u57CE\u5E02" },
      { key: "extra", label: "\u8865\u5145\u63CF\u8FF0" }
    ],
    getKnownSkuOptions() {
      const seen = {};
      const result = [];
      categories.filter((category) => !category.locked).forEach((category) => {
        (category.skus || []).forEach((sku) => {
          if (!seen[sku]) {
            seen[sku] = true;
            result.push(sku);
          }
        });
      });
      return result;
    },
    showSummary() {
      const resolved = this.resolveSku();
      if (resolved && resolved !== "\u7EFC\u5408\u670D\u52A1") {
        this.collected.issue = resolved;
        this.params.sku = resolved;
      }
      this.state = "summary";
      this.hideInputBar();
      this.renderChat();
    },
    renderSummaryCard() {
      return renderSummaryCard(this);
    },
    toggleEdit() {
      this.editMode = true;
      this.showSummary();
    },
    saveSummaryEdit() {
      document.querySelectorAll(".p5-summary-input").forEach((element) => {
        this.collected[element.getAttribute("data-field")] = element.value.trim();
      });
      if (this.collected.issue) this.params.sku = this.collected.issue;
      this.editMode = false;
      this.renderChat();
      toast("\u5DF2\u4FDD\u5B58\u4FEE\u6539");
    },
    hideInputBar() {
      const bar = document.getElementById("p5InputBar");
      if (bar) bar.style.display = "none";
    },
    showInputBar() {
      const bar = document.getElementById("p5InputBar");
      if (bar) bar.style.display = "flex";
    },
    getCurrentResults() {
      const all = this.getAllResults();
      const start = this.currentBatch * 3;
      return all.slice(start, start + 3);
    },
    getAllResults() {
      const sku = this.resolveSku();
      const categoryId = this.inferCategory(sku) || this.params.categoryId || null;
      return getMatchResults({ sku, categoryId, teamId: this.params.teamId, city: user.city }, domainOptions2());
    },
    showMatch() {
      this.clearMatchingTimers();
      this.state = "matching";
      const results = this.getCurrentResults();
      this.checkedTeams = {};
      if (results.length > 0) {
        const preferred = results.find((item) => item.teamId === this.params.teamId);
        this.checkedTeams[(preferred || results[0]).teamId] = true;
      }
      renderPageContent(renderMatchingProgress(this, 0), "p5-matching");
      this.matchingTimers = [
        setTimeout(() => updateMatchingProgress(1), 420),
        setTimeout(() => updateMatchingProgress(2), 880),
        setTimeout(() => {
          if (this.state !== "matching") return;
          this.state = "match";
          renderPageContent(this.renderMatchHTML(results), "p5-match");
          bindMatchResults(this);
          this.matchingTimers = [];
        }, 1450)
      ];
    },
    clearMatchingTimers() {
      (this.matchingTimers || []).forEach((timer) => clearTimeout(timer));
      this.matchingTimers = [];
    },
    returnToSummary() {
      this.clearMatchingTimers();
      this.state = "summary";
      this.editMode = false;
      renderPageContent(this.renderConversationShell(), "p5");
      this.bindConversationShell();
      this.renderChat();
      this.hideInputBar();
    },
    renderMatchHTML(results) {
      return renderMatchResults(this, results, (teamId) => getTeam(teamId, store.teams));
    },
    toggleCheck(teamId) {
      this.checkedTeams[teamId] = !this.checkedTeams[teamId];
      const checkbox = document.querySelector('.p5-match-check[data-team="' + teamId + '"]');
      if (checkbox) {
        checkbox.classList.toggle("checked", this.checkedTeams[teamId]);
        checkbox.innerHTML = this.checkedTeams[teamId] ? icon("check", 14) : "";
      }
      const checkedCount = Object.keys(this.checkedTeams).filter((id) => this.checkedTeams[id]).length;
      const button = document.querySelector(".bottom-bar .btn");
      if (button) button.textContent = "\u5411" + checkedCount + "\u5BB6\u56E2\u961F\u53D1\u9001\u9700\u6C42";
    },
    toggleTeamFromDetail,
    openMatchTeamDetail(teamId) {
      const top = pageStack[pageStack.length - 1];
      if (top && top.pageId === "p5") top.params.resumeMatch = true;
      navigateTo("p3", {
        teamId,
        sku: this.resolveSku(),
        source: "match",
        matchSelected: Boolean(this.checkedTeams[teamId])
      });
    },
    openMatchServiceDetail(teamId) {
      const top = pageStack[pageStack.length - 1];
      if (top && top.pageId === "p5") top.params.resumeMatch = true;
      const sku = this.resolveSku();
      navigateTo("p10", { teamId, categoryId: this.inferCategory(sku), sku, source: "match" });
    },
    toggleReason(button) {
      const block = button.closest(".p5-match-reason");
      if (!block) return;
      const collapsed = block.classList.toggle("is-collapsed");
      button.innerHTML = collapsed ? "\u5C55\u5F00\u4F9D\u636E " + icon("chevron-down", 13) : "\u6536\u8D77\u5339\u914D\u4F9D\u636E " + icon("chevron-down", 13);
      button.setAttribute("aria-expanded", collapsed ? "false" : "true");
    },
    changeBatch() {
      const batchCount = Math.ceil(this.getAllResults().length / 3);
      if (this.currentBatch >= batchCount - 1) {
        toast("\u5DF2\u5C55\u793A\u5168\u90E8\u63A8\u8350");
        return;
      }
      this.currentBatch += 1;
      const results = this.getCurrentResults();
      this.checkedTeams = {};
      if (results.length > 0) this.checkedTeams[results[0].teamId] = true;
      renderPageContent(this.renderMatchHTML(results), "p5-match");
      bindMatchResults(this);
      toast("\u5DF2\u4E3A\u4F60\u66F4\u6362\u63A8\u8350");
    },
    showSuccess() {
      const checkedIds = Object.keys(this.checkedTeams).filter((teamId) => this.checkedTeams[teamId]);
      if (checkedIds.length === 0) {
        toast("\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u5BB6\u56E2\u961F");
        return;
      }
      this.state = "success";
      const newDemand = this.buildDemand(checkedIds);
      this.createdDemandId = newDemand.id;
      replaceCurrentPage("p9", {});
      simulateResponses(newDemand.id, (demand, decision, team) => {
        emitChange();
        const name = team ? team.name : "\u670D\u52A1\u56E2\u961F";
        if (decision.type === "accept") toast(name + " \u5DF2\u54CD\u5E94");
        else if (decision.type === "reject") toast(name + " \u6682\u672A\u627F\u63A5");
        const timelineCard = document.querySelector(".p5-timeline-card");
        if (timelineCard) timelineCard.innerHTML = renderDemandTimeline(demand);
        const responseCard = document.getElementById("p5SuccessResponse");
        if (responseCard) responseCard.innerHTML = this.renderSuccessResponseSummary(demand);
        const nextSteps = document.getElementById("p5SuccessNext");
        if (nextSteps) nextSteps.innerHTML = renderSuccessNext(demand);
        this.refreshSuccessPrimary(demand);
        updateBadge();
      }, domainOptions2());
      renderPageContent(renderSuccessView(newDemand), "p5-success");
      bindSuccessView(newDemand);
      this.refreshSuccessPrimary(newDemand);
      updateBadge();
      if (!isWecomAdded()) setTimeout(() => openWecomGuide("afterPublish"), 260);
    },
    renderSuccessResponseSummary,
    refreshSuccessPrimary,
    renderWecomCard,
    openWecomGuide,
    buildDemand(checkedIds) {
      const selectedIds = checkedIds || Object.keys(this.checkedTeams).filter((teamId) => this.checkedTeams[teamId]);
      const value = (key) => this.collected[key] && this.collected[key] !== "\u672A\u63D0\u4F9B" ? this.collected[key] : "";
      const sku = this.resolveSku();
      const categoryId = this.inferCategory(sku) || this.params.categoryId || "law";
      const category = getCategory(categoryId, categories);
      const extra = value("extra");
      const demand = createDemand({
        title: this.params.renew ? sku + "\u7EED\u8D39\u9700\u6C42" : this.params.additional ? sku + "\u65B0\u589E\u9700\u6C42" : sku === "\u7EFC\u5408\u670D\u52A1" ? "\u7EFC\u5408\u670D\u52A1\u9700\u6C42" : sku + "\u670D\u52A1\u9700\u6C42",
        categoryId,
        categoryName: category ? category.name : "\u4F01\u4E1A\u670D\u52A1",
        sku,
        budget: value("budget") || "\u672A\u63D0\u4F9B",
        desc: user.company + (sku === "\u7EFC\u5408\u670D\u52A1" ? "\u9700\u8981\u5E73\u53F0\u534F\u52A9\u5339\u914D\u670D\u52A1\u56E2\u961F\u3002" : "\u9700\u8981" + sku + "\u670D\u52A1\u3002") + extra,
        fields: [
          { label: "\u670D\u52A1\u7C7B\u578B", value: sku },
          { label: "\u5173\u952E\u4FE1\u606F", value: value("skuSpecific") || "\u672A\u63D0\u4F9B" },
          { label: "\u9884\u7B97\u8303\u56F4", value: value("budget") || "\u672A\u63D0\u4F9B" },
          { label: "\u671F\u671B\u5B8C\u6210\u65F6\u95F4", value: value("timeline") || "\u672A\u63D0\u4F9B" },
          { label: "\u5B9E\u9645\u529E\u516C\u57CE\u5E02", value: this.collected.city },
          { label: "\u8865\u5145\u63CF\u8FF0", value: extra || "\u672A\u63D0\u4F9B" }
        ],
        teamIds: selectedIds,
        resubmitFrom: this.resubmitFrom,
        sourceDemandId: this.resubmitFrom,
        cooperationType: this.params.renew ? "renewal" : this.params.additional ? "additional" : "new",
        targetTeamId: this.params.teamId || null
      }, domainOptions2());
      emitChange();
      return demand;
    },
    inferCategory(sku) {
      const category = categories.find((item) => item.skus.includes(sku));
      return category ? category.id : null;
    }
  };
  register("p5", page3);

  // src/pages/p3-detail/sections/Cases.js
  function renderCases(team, getCaseDetail) {
    if (!team.cases || !team.cases.length) return "";
    let html = '<section class="p3-section" id="p3-cases"><div class="p3-section-pad"><div class="section-title">\u670D\u52A1\u6848\u4F8B</div>';
    team.cases.forEach((group, groupIndex) => {
      html += '<div class="p3-case-group"><div class="p3-case-dir">' + group.dir + "</div>";
      group.items.forEach((title, itemIndex) => {
        const detail = getCaseDetail(group.dir, title);
        html += '<button class="p3-case-item" type="button" data-case-group="' + groupIndex + '" data-case-item="' + itemIndex + '"><span class="p3-case-item-copy"><strong>' + title + "</strong><small>" + detail.customer + "</small><p>" + detail.outcome + '</p></span><span class="p3-case-more">\u67E5\u770B\u8BE6\u60C5 ' + icon("chevron-right", 14) + "</span></button>";
      });
      html += "</div>";
    });
    html += "</div></section>";
    return html;
  }

  // src/pages/p3-detail/sections/Intro.js
  function renderIntro(team) {
    return '<section class="p3-section p3-intro-section"><div class="p3-section-pad"><div class="section-title">\u56E2\u961F\u4ECB\u7ECD</div><div id="p3IntroText" class="p3-intro-text">' + escapeHTML(team.desc) + '</div><button id="p3IntroToggle" class="p3-inline-toggle" type="button">\u67E5\u770B\u5168\u6587</button></div></section>';
  }

  // src/pages/p3-detail/sections/Members.js
  function renderMembers(team) {
    if (!team.members || !team.members.length) return "";
    let html = '<section class="p3-section"><div class="p3-section-pad"><div class="section-title">\u6838\u5FC3\u6210\u5458</div>';
    team.members.forEach((member) => {
      html += '<div class="p3-member-row"><div class="avatar avatar-sm" style="background:' + (team.avatarColor || "#3A6DF0") + "20;color:" + (team.avatarColor || "#3A6DF0") + '">' + member.avatar + '</div><div class="p3-member-info"><div class="p3-member-name">' + member.name + '</div><div class="p3-member-role">' + member.role + " \xB7 " + member.desc + "</div></div></div>";
    });
    html += "</div></section>";
    return html;
  }

  // src/pages/p3-detail/sections/QA.js
  function renderQA(questions) {
    let html = '<section class="p3-section" id="p3-qa"><div class="p3-section-pad"><div class="p3-section-head"><div class="section-title">\u670D\u52A1\u95EE\u7B54</div><button class="p3-ask-button" id="p3AskQuestion" type="button">\u6211\u8981\u63D0\u95EE</button></div>';
    if (questions.length) {
      questions.forEach((question) => {
        html += '<div class="p3-qa-item"><div class="p3-qa-q"><span>Q</span><span>' + escapeHTML(question.q) + "</span></div>" + (question.pending ? '<div class="p3-qa-pending">' + icon("clock", 13) + " \u5F85\u56E2\u961F\u56DE\u590D</div>" : '<div class="p3-qa-a">' + escapeHTML(question.a) + '</div><div class="p3-qa-tag">' + escapeHTML(question.tag) + "</div>") + "</div>";
      });
    } else {
      html += '<div class="p3-qa-empty">\u6682\u65E0\u95EE\u7B54</div>';
    }
    html += "</div></section>";
    return html;
  }

  // src/pages/p3-detail/sections/Reviews.js
  function renderReviews(team, dimensions) {
    let html = '<section class="p3-section p3-review-summary-button" id="p3-reviews" role="button" tabindex="0"><div class="p3-section-pad"><div class="p3-rating-overview-head"><div><div class="section-title">\u8BC4\u4EF7\u8868\u73B0</div><small>' + team.reviewCount + "\u6761\u5E73\u53F0\u5185\u670D\u52A1\u8BC4\u4EF7 \xB7 \u70B9\u51FB\u67E5\u770B\u8BE6\u60C5</small></div><strong>" + team.rating + '</strong></div><div class="p3-rating-dimensions">';
    Object.keys(reviewDimensionLabels).forEach((key) => {
      html += "<div><span>" + reviewDimensionLabels[key] + "</span><strong>" + Number(dimensions[key]).toFixed(1) + "</strong></div>";
    });
    html += "</div>" + (team.reviewCount >= 5 && team.aiSummary ? '<div class="p3-ai-summary"><div class="p3-ai-summary-text">' + team.aiSummary + "</div></div>" : "") + '<span class="p3-review-summary-more">\u67E5\u770B\u8BC4\u4EF7\u8BE6\u60C5 ' + icon("chevron-right", 16) + "</span></div></section>";
    return html;
  }

  // src/pages/p3-detail/sections/Verify.js
  function renderVerify(team) {
    if (!team.verifyItems || !team.verifyItems.length) return "";
    let html = '<section class="p3-section" id="p3-verify"><div class="p3-section-pad"><div class="section-title">\u8D44\u8D28\u6838\u9A8C</div>';
    team.verifyItems.forEach((item, index) => {
      const iconName = item.status === "verified" ? "check-circle" : item.status === "public" ? "file-text" : "alert";
      const label = item.status === "verified" ? item.label.replace(" \xB7 \u5DF2\u6838\u9A8C", "") : item.label;
      html += '<div class="p3-verify-row' + (index >= 2 ? " p3-verify-hidden" : "") + '"><span class="p3-verify-icon">' + icon(iconName, 16) + "</span><span>" + label + "</span><b>" + (item.status === "verified" ? "\u5DF2\u6838\u9A8C" : "\u516C\u5F00\u4FE1\u606F") + "</b></div>";
    });
    if (team.verifyItems.length > 2) html += '<button id="p3VerifyToggle" class="p3-inline-toggle" type="button">\u67E5\u770B\u5168\u90E8\u8D44\u8D28\uFF08' + team.verifyItems.length + "\uFF09</button>";
    html += "</div></section>";
    return html;
  }

  // src/pages/p3-detail/sheets/CaseSheet.js
  function openCaseSheet(team, groupIndex, itemIndex, getCaseDetail) {
    const group = team && team.cases && team.cases[groupIndex];
    const title = group && group.items[itemIndex];
    if (!group || !title) return;
    const detail = getCaseDetail(group.dir, title);
    const body = '<article class="p3-case-detail"><div class="p3-case-detail-note">\u5BA2\u6237\u4FE1\u606F\u5DF2\u533F\u540D\u5904\u7406</div><h3>' + escapeHTML(title) + "</h3><dl><div><dt>\u5BA2\u6237\u80CC\u666F</dt><dd>" + escapeHTML(detail.customer) + "</dd></div><div><dt>\u6838\u5FC3\u95EE\u9898</dt><dd>" + escapeHTML(detail.challenge) + "</dd></div><div><dt>\u56E2\u961F\u670D\u52A1</dt><dd>" + escapeHTML(detail.service) + "</dd></div><div><dt>\u4EA4\u4ED8\u7ED3\u679C</dt><dd>" + escapeHTML(detail.outcome) + "</dd></div><div><dt>\u9879\u76EE\u5468\u671F</dt><dd>" + escapeHTML(detail.period) + "</dd></div></dl></article>";
    showSheet({ title: group.dir + "\u6848\u4F8B", body });
  }

  // src/pages/p3-detail/sheets/FAQSheet.js
  var FAQ = [
    ["\u5E73\u53F0\u5982\u4F55\u4FDD\u969C\u6211\u7684\u4FE1\u606F\u5B89\u5168\uFF1F", "\u9700\u6C42\u53D1\u51FA\u540E\u7531\u5E73\u53F0\u4EE3\u4E3A\u8F6C\u63A5\u6C9F\u901A\uFF0C\u4F60\u7684\u8054\u7CFB\u65B9\u5F0F\u4E0D\u4F1A\u76F4\u63A5\u5C55\u793A\u7ED9\u670D\u52A1\u56E2\u961F\u3002"],
    ["\u9875\u9762\u4E0A\u7684\u4EF7\u683C\u662F\u6700\u7EC8\u62A5\u4EF7\u5417\uFF1F", "\u9875\u9762\u4EF7\u683C\u4E3A\u8D77\u4EF7\u6216\u53C2\u8003\u4EF7\uFF0C\u6700\u7EC8\u62A5\u4EF7\u4EE5\u53CC\u65B9\u786E\u8BA4\u7684\u670D\u52A1\u65B9\u6848\u4E3A\u51C6\u3002"],
    ["\u4EC0\u4E48\u65F6\u5019\u8FDB\u5165\u670D\u52A1\uFF1F", "\u786E\u8BA4\u670D\u52A1\u65B9\u6848\u3001\u5B8C\u6210\u53CC\u65B9\u534F\u8BAE\u5E76\u901A\u8FC7\u5E73\u53F0\u5BA1\u6838\u540E\uFF0C\u56E2\u961F\u5F00\u59CB\u4EA4\u4ED8\u3002"]
  ];
  function openFAQSheet() {
    showSheet({
      title: "\u5E73\u53F0\u5E38\u89C1\u95EE\u9898",
      body: FAQ.map((item) => '<div class="p3-faq-item"><strong>Q\uFF1A' + item[0] + "</strong><p>A\uFF1A" + item[1] + "</p></div>").join("")
    });
  }

  // src/pages/p3-detail/sheets/QuestionSheet.js
  function openQuestionSheet(team, onSubmitted) {
    const overlay = showSheet({
      title: "\u5411\u56E2\u961F\u63D0\u95EE",
      body: '<div class="p3-question-sheet"><p>\u95EE\u9898\u4F1A\u5C55\u793A\u5728\u8BE5\u56E2\u961F\u7684\u670D\u52A1\u95EE\u7B54\u4E2D\uFF0C\u7531\u56E2\u961F\u540E\u7EED\u56DE\u590D\u3002</p><textarea id="p3QuestionInput" maxlength="200" placeholder="\u4F8B\u5982\uFF1A\u4F60\u4EEC\u662F\u5426\u505A\u8FC7\u4E92\u8054\u7F51\u4F01\u4E1A\u7684\u80A1\u6743\u67B6\u6784\u9879\u76EE\uFF1F"></textarea><div class="p3-question-count"><span id="p3QuestionCount">0</span>/200</div><button class="btn btn-primary btn-block" id="p3QuestionSubmit" type="button">\u63D0\u4EA4\u95EE\u9898</button></div>'
    });
    const input = overlay.querySelector("#p3QuestionInput");
    input.addEventListener("input", function() {
      overlay.querySelector("#p3QuestionCount").textContent = this.value.length;
    });
    overlay.querySelector("#p3QuestionSubmit").addEventListener("click", () => {
      const text = input.value.trim();
      if (!text) {
        toast("\u8BF7\u5148\u5199\u4E0B\u4F60\u7684\u95EE\u9898");
        input.focus();
        return;
      }
      submitTeamQuestion(team.id, text);
      emitChange();
      closeAllModals();
      onSubmitted();
      toast("\u95EE\u9898\u5DF2\u63D0\u4EA4\uFF0C\u7B49\u5F85\u56E2\u961F\u56DE\u590D");
    });
  }

  // src/pages/p3-detail/sheets/ReviewSheet.js
  function openReviewSheet(team) {
    if (!team) return;
    const dimensions = getTeamRatingDimensions(team);
    let body = '<div class="p3-review-detail"><div class="p3-review-score"><strong>' + team.rating + "</strong><span>" + renderStars(team.rating) + "<small>" + team.reviewCount + '\u6761\u5E73\u53F0\u5185\u670D\u52A1\u8BC4\u4EF7</small></span></div><div class="p3-review-detail-dims">';
    Object.keys(reviewDimensionLabels).forEach((key) => {
      body += "<div><span>" + reviewDimensionLabels[key] + "</span><b>" + Number(dimensions[key]).toFixed(1) + "</b></div>";
    });
    body += "</div>";
    (team.reviews || []).forEach((review) => {
      body += '<article class="p3-review-detail-item"><div><strong>' + review.user + "</strong>" + renderStars(review.rating) + "</div><p>" + review.text + "</p><small>" + review.date + "</small></article>";
    });
    body += "</div>";
    showSheet({ title: "\u8BC4\u4EF7\u8BE6\u60C5", body });
  }

  // src/pages/p3-detail/index.js
  function domainOptions3() {
    return {
      categories,
      chatMessages: store.chatMessages,
      demands: store.demands,
      teams: store.teams,
      user
    };
  }
  function startDirectConsultation(teamId, sku) {
    const team = getTeam(teamId, store.teams);
    if (!team) {
      toast("\u6682\u65F6\u65E0\u6CD5\u627E\u5230\u8BE5\u56E2\u961F");
      return;
    }
    const serviceName = sku || team.skus[0];
    const demand = getOrCreateDirectConsultation(teamId, serviceName, domainOptions3());
    emitChange();
    navigateTo("p7", { demandId: demand.id, teamId, sku: serviceName, direct: true });
  }
  var serviceDescriptions = {
    "\u80A1\u6743\u67B6\u6784\u8BBE\u8BA1": "\u80A1\u6743\u6BD4\u4F8B\u3001\u63A7\u5236\u6743\u4E0E\u671F\u6743\u6C60\u8BBE\u8BA1",
    "\u5408\u540C\u5BA1\u67E5": "\u8BC6\u522B\u5173\u952E\u6761\u6B3E\u3001\u8D23\u4EFB\u8FB9\u754C\u4E0E\u5C65\u7EA6\u98CE\u9669",
    "\u878D\u8D44\u4EA4\u6613": "\u4EA4\u6613\u7ED3\u6784\u3001\u6587\u4EF6\u8D77\u8349\u4E0E\u8C08\u5224\u652F\u6301",
    "\u80A1\u6743\u6FC0\u52B1": "\u6FC0\u52B1\u6A21\u5F0F\u3001\u6388\u4E88\u673A\u5236\u4E0E\u914D\u5957\u6587\u4EF6",
    "\u77E5\u8BC6\u4EA7\u6743\u4FDD\u62A4": "\u77E5\u8BC6\u4EA7\u6743\u5E03\u5C40\u3001\u786E\u6743\u4E0E\u98CE\u9669\u5E94\u5BF9",
    "\u52B3\u52A8\u5408\u89C4": "\u52B3\u52A8\u5408\u540C\u3001\u5236\u5EA6\u53CA\u7528\u5DE5\u98CE\u9669\u5BA1\u67E5",
    "\u516C\u53F8\u6CE8\u518C": "\u4F01\u4E1A\u8BBE\u7ACB\u767B\u8BB0\u4E0E\u914D\u5957\u4E8B\u9879\u529E\u7406",
    "\u5DE5\u5546\u53D8\u66F4": "\u80A1\u4E1C\u3001\u5730\u5740\u3001\u7ECF\u8425\u8303\u56F4\u7B49\u4FE1\u606F\u53D8\u66F4",
    "\u516C\u53F8\u6CE8\u9500": "\u6CE8\u9500\u6D41\u7A0B\u68B3\u7406\u4E0E\u767B\u8BB0\u624B\u7EED\u529E\u7406",
    "\u5E74\u68C0\u5E74\u62A5": "\u5E74\u5EA6\u62A5\u544A\u586B\u62A5\u4E0E\u516C\u793A\u4E8B\u9879\u6838\u5BF9",
    "\u8D44\u8D28\u529E\u7406": "\u7ECF\u8425\u8D44\u8D28\u7533\u8BF7\u4E0E\u6750\u6599\u51C6\u5907",
    "\u5546\u6807\u6CE8\u518C": "\u5546\u6807\u68C0\u7D22\u3001\u7C7B\u522B\u5EFA\u8BAE\u4E0E\u6CE8\u518C\u7533\u8BF7",
    "\u4E13\u5229\u7533\u8BF7": "\u6280\u672F\u65B9\u6848\u68B3\u7406\u4E0E\u4E13\u5229\u7533\u8BF7\u652F\u6301",
    "\u8457\u4F5C\u6743\u767B\u8BB0": "\u4F5C\u54C1\u6750\u6599\u6574\u7406\u4E0E\u767B\u8BB0\u7533\u8BF7",
    "\u5546\u6807\u9A73\u56DE\u590D\u5BA1": "\u9A73\u56DE\u539F\u56E0\u5206\u6790\u4E0E\u590D\u5BA1\u6750\u6599\u51C6\u5907",
    "\u4E13\u5229\u4FB5\u6743\u5206\u6790": "\u4FB5\u6743\u98CE\u9669\u5224\u65AD\u4E0E\u5E94\u5BF9\u5EFA\u8BAE",
    "\u9AD8\u65B0\u6280\u672F\u4F01\u4E1A\u8BA4\u5B9A": "\u8D44\u683C\u8BC4\u4F30\u3001\u7533\u62A5\u6750\u6599\u89C4\u5212\u4E0E\u8FDB\u5EA6\u8DDF\u8FDB",
    "\u4E13\u7CBE\u7279\u65B0\u7533\u62A5": "\u6307\u6807\u8BC4\u4F30\u3001\u6750\u6599\u6574\u7406\u4E0E\u7533\u62A5\u8DDF\u8FDB",
    "\u79D1\u6280\u9879\u76EE\u7533\u62A5": "\u9879\u76EE\u9002\u914D\u8BC4\u4F30\u4E0E\u7533\u62A5\u6750\u6599\u51C6\u5907"
  };
  function getServiceDescription(sku) {
    return serviceDescriptions[sku] || "\u67E5\u770B\u670D\u52A1\u8303\u56F4\u3001\u4EA4\u4ED8\u5185\u5BB9\u4E0E\u529E\u7406\u8BF4\u660E";
  }
  var page4 = {
    state: { team: null, params: {}, introExpanded: false, verifyExpanded: false },
    renderFavoriteContent(teamId) {
      const active = isFavoriteTeam(teamId);
      return '<span class="p3-favorite-icon">' + icon(active ? "star" : "star-outline", 18) + "</span><span>" + (active ? "\u5DF2\u6536\u85CF" : "\u6536\u85CF") + "</span>";
    },
    render(params) {
      const team = getTeam(params.teamId, store.teams);
      if (!team) return '<div class="empty-state"><div class="empty-icon">' + icon("help", 48) + '</div><div class="empty-title">\u56E2\u961F\u4E0D\u5B58\u5728</div></div>';
      this.state = { team, params: params || {}, introExpanded: false, verifyExpanded: false };
      const selectedSku = params.sku && team.skus.includes(params.sku) ? params.sku : team.skus[0] || "";
      const stagedSelected = isStagedService(selectedSku);
      const selectedCategory = getCategoryForSku(selectedSku, categories) || getCategoryForTeam(team, categories);
      const selectedCategoryId = selectedCategory ? selectedCategory.id : "";
      const dimensions = getTeamRatingDimensions(team);
      let html = "";
      html += '<div class="nav-bar"><button class="nav-back" id="p3Back">' + icon("chevron-left", 22) + '</button><div class="nav-title">\u56E2\u961F\u8BE6\u60C5</div><button class="p3-favorite-action" id="p3Favorite" type="button" aria-pressed="' + isFavoriteTeam(team.id) + '">' + this.renderFavoriteContent(team.id) + "</button></div>";
      html += '<div class="p3-gallery-wrap">' + renderEntityGallery(team, "team") + '<div class="p3-gallery-identity"><div class="p3-hero-name">' + team.name + (team.badge ? " " + renderBadge(team.badge) : "") + '</div><div class="p3-hero-sub">' + team.orgShort + " \xB7 " + team.city + "\xB7" + team.district + " \xB7 " + icon("check-circle", 13) + " \u8D44\u8D28\u5DF2\u6838\u9A8C</div></div></div>";
      html += '<div class="anchor-bar" id="p3AnchorBar"><div class="anchor-item active" data-anchor="overview">\u56E2\u961F</div><div class="anchor-item" data-anchor="services">\u670D\u52A1</div><div class="anchor-item" data-anchor="verify">\u8D44\u8D28</div><div class="anchor-item" data-anchor="reviews">\u8BC4\u4EF7</div></div>';
      html += '<div class="p3-info-card" id="p3-overview"><div class="p3-top-rating">' + renderStars(team.rating) + "<span>" + (team.reviewCount > 0 ? team.reviewCount + "\u6761\u8BC4\u4EF7" : "\u6682\u65E0\u8BC4\u4EF7") + '</span></div><div class="p3-top-meta"><span>' + icon("price-tag", 14) + " " + team.priceText + " \xB7 " + team.priceMode + "</span>" + (team.avgResponse ? "<span>" + icon("zap", 14) + " \u5747\u54CD\u5E94" + team.avgResponse + "</span>" : "") + "</div></div>";
      html += renderIntro(team);
      html += renderMembers(team);
      html += renderCases(team, (category, title) => this.getCaseDetail(category, title));
      html += '<section class="p3-section"><div class="p3-section-pad"><div class="section-title">\u6240\u5C5E\u673A\u6784</div><button class="p3-org-link" id="p3OrgLink" type="button"><span><strong>' + team.orgName + "</strong><small>" + team.orgShort + "</small></span>" + icon("chevron-right", 16) + "</button></div></section>";
      if (team.awards && team.awards.length) {
        html += '<section class="p3-section p3-awards-section"><div class="p3-section-pad"><div class="section-title">\u8363\u8A89\u5956\u9879</div><div class="p3-award-list">';
        team.awards.forEach((award) => {
          html += '<div class="p3-award-item"><span class="p3-award-medallion">' + icon("award", 20) + '</span><div class="p3-award-copy"><strong>' + award.title + '</strong><small>\u4E13\u4E1A\u670D\u52A1\u8363\u8A89</small></div><b class="p3-award-year">' + award.year + "</b></div>";
        });
        html += "</div></div></section>";
      }
      html += '<section class="p3-section" id="p3-services"><div class="p3-section-pad"><div class="section-title">\u53EF\u63D0\u4F9B\u670D\u52A1</div>';
      team.skus.forEach((sku) => {
        const serviceCategory = getCategoryForSku(sku, categories);
        html += '<button class="p3-sku-row" type="button" data-team="' + team.id + '" data-category="' + (serviceCategory ? serviceCategory.id : selectedCategoryId) + '" data-sku="' + escapeHTML(sku) + '"><span class="p3-sku-icon">' + icon(serviceCategory ? serviceCategory.icon : "briefcase", 18) + '</span><span class="p3-sku-copy"><strong>' + sku + "</strong><small>" + getServiceDescription(sku) + '</small></span><span class="p3-sku-price"><strong>' + team.priceText + "</strong><small>\u67E5\u770B\u8BE6\u60C5 " + icon("chevron-right", 13) + "</small></span></button>";
      });
      html += "</div></section>";
      html += renderVerify(team);
      html += renderReviews(team, dimensions);
      html += renderQA(getTeamQuestions(team.id, store.teams));
      const matchSelected = params.source === "match" && Boolean(params.matchSelected);
      html += '<div class="bottom-bar"><button class="p3-bottom-ai" id="p3PlatformFAQ" type="button">' + icon("message", 22) + '<span class="p3-bottom-ai-label">\u5E38\u89C1\u95EE\u9898</span></button><div class="p3-bottom-price"><div class="p3-bottom-price-label">' + (stagedSelected ? "\u62A5\u4EF7\u65B9\u5F0F" : "\u8D77\u4EF7") + '</div><div class="p3-bottom-price-val">' + team.priceText + "</div></div>";
      if (params.source === "match") {
        html += '<button class="btn ' + (matchSelected ? "btn-outline" : "btn-primary") + ' p3-match-select" id="p3MatchSelect" type="button">' + (matchSelected ? "\u53D6\u6D88\u9009\u62E9" : "\u9009\u62E9\u8BE5\u56E2\u961F") + "</button>";
      } else {
        html += '<button class="btn btn-primary p3-consult-direct" id="p3ConsultDirect" type="button">' + (stagedSelected ? "\u4E86\u89E3\u670D\u52A1\u5E76\u83B7\u53D6\u65B9\u6848" : "\u5411\u8BE5\u56E2\u961F\u54A8\u8BE2") + "</button>";
      }
      html += "</div>";
      return html;
    },
    init() {
      showTabBar(false);
      bindEntityGallery(document, this.state.team, "team");
      const backButton = document.getElementById("p3Back");
      if (backButton) backButton.addEventListener("click", goBackToPrevious);
      document.querySelectorAll("#p3AnchorBar .anchor-item").forEach((item) => {
        item.addEventListener("click", function() {
          document.querySelectorAll("#p3AnchorBar .anchor-item").forEach((node) => node.classList.remove("active"));
          this.classList.add("active");
          const target = document.getElementById("p3-" + this.getAttribute("data-anchor"));
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
      const introToggle = document.getElementById("p3IntroToggle");
      const introText = document.getElementById("p3IntroText");
      if (introToggle && introText) introToggle.addEventListener("click", () => {
        this.state.introExpanded = !this.state.introExpanded;
        introText.classList.toggle("expanded", this.state.introExpanded);
        introToggle.textContent = this.state.introExpanded ? "\u6536\u8D77" : "\u67E5\u770B\u5168\u6587";
      });
      const verifyToggle = document.getElementById("p3VerifyToggle");
      if (verifyToggle) verifyToggle.addEventListener("click", () => {
        this.state.verifyExpanded = !this.state.verifyExpanded;
        document.querySelectorAll(".p3-verify-hidden").forEach((row) => {
          row.style.display = this.state.verifyExpanded ? "flex" : "none";
        });
        verifyToggle.textContent = this.state.verifyExpanded ? "\u6536\u8D77" : "\u67E5\u770B\u5168\u90E8\u8D44\u8D28\uFF08" + this.state.team.verifyItems.length + "\uFF09";
      });
      document.querySelectorAll(".p3-case-item").forEach((button) => {
        button.addEventListener("click", () => this.openCaseDetail(Number(button.getAttribute("data-case-group")), Number(button.getAttribute("data-case-item"))));
      });
      const orgLink = document.getElementById("p3OrgLink");
      if (orgLink) orgLink.addEventListener("click", () => navigateTo("p4", { orgId: this.state.team.orgId }));
      document.querySelectorAll(".p3-sku-row").forEach((button) => {
        button.addEventListener("click", () => navigateTo("p10", {
          teamId: button.getAttribute("data-team"),
          categoryId: button.getAttribute("data-category"),
          sku: button.getAttribute("data-sku")
        }));
      });
      const favorite = document.getElementById("p3Favorite");
      if (favorite) favorite.addEventListener("click", () => {
        const active = toggleFavoriteTeam(this.state.team.id);
        emitChange();
        favorite.innerHTML = this.renderFavoriteContent(this.state.team.id);
        favorite.classList.toggle("active", active);
        favorite.setAttribute("aria-pressed", active ? "true" : "false");
        toast(active ? "\u5DF2\u6536\u85CF\u8BE5\u56E2\u961F" : "\u5DF2\u53D6\u6D88\u6536\u85CF");
      });
      const ask = document.getElementById("p3AskQuestion");
      if (ask) ask.addEventListener("click", () => this.openQuestionSheet());
      const reviews = document.getElementById("p3-reviews");
      if (reviews) {
        reviews.addEventListener("click", () => this.openReviewDetails());
        reviews.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            this.openReviewDetails();
          }
        });
      }
      const faqButton = document.getElementById("p3PlatformFAQ");
      if (faqButton) faqButton.addEventListener("click", () => this.openPlatformFAQ());
      const direct = document.getElementById("p3ConsultDirect");
      if (direct) direct.addEventListener("click", () => {
        const sku = this.state.params.sku && this.state.team.skus.includes(this.state.params.sku) ? this.state.params.sku : this.state.team.skus[0];
        if (isStagedService(sku)) navigateTo("p10", { teamId: this.state.team.id, sku });
        else startDirectConsultation(this.state.team.id, sku);
      });
      const match = document.getElementById("p3MatchSelect");
      if (match) match.addEventListener("click", () => {
        toggleTeamFromDetail(this.state.team.id);
        goBackToPrevious();
      });
    },
    getCaseDetail(category, title) {
      return caseLibrary[title] || {
        customer: "\u4F01\u4E1A\u5BA2\u6237 \xB7 \u4FE1\u606F\u5DF2\u533F\u540D",
        challenge: "\u5BA2\u6237\u56F4\u7ED5\u201C" + category + "\u201D\u63D0\u51FA\u4E13\u4E1A\u670D\u52A1\u9700\u6C42\uFF0C\u9700\u8981\u8FDB\u4E00\u6B65\u660E\u786E\u8303\u56F4\u548C\u843D\u5730\u8DEF\u5F84\u3002",
        service: title,
        outcome: "\u5B8C\u6210\u7EA6\u5B9A\u8303\u56F4\u5185\u7684\u65B9\u6848\u3001\u6587\u4EF6\u6216\u529E\u7406\u4E8B\u9879\u4EA4\u4ED8\u3002",
        period: "\u4EE5\u53CC\u65B9\u5B9E\u9645\u9879\u76EE\u4E3A\u51C6"
      };
    },
    openCaseDetail(groupIndex, itemIndex) {
      openCaseSheet(this.state.team, groupIndex, itemIndex, (category, title) => this.getCaseDetail(category, title));
    },
    openReviewDetails() {
      openReviewSheet(this.state.team);
    },
    openQuestionSheet() {
      openQuestionSheet(this.state.team, refreshActivePage);
    },
    openPlatformFAQ() {
      openFAQSheet();
    }
  };
  register("p3", page4);

  // src/pages/p4-org/index.js
  function sortedOrgTeams(orgId) {
    return getTeamsByOrg(orgId, store.teams).sort((first, second) => {
      const firstBadge = first.badge ? 1 : 0;
      const secondBadge = second.badge ? 1 : 0;
      if (firstBadge !== secondBadge) return secondBadge - firstBadge;
      return second.rating - first.rating;
    });
  }
  var page5 = {
    render(params) {
      const org = getOrg(params.orgId, orgs);
      if (!org) {
        return '<div class="empty-state"><div class="empty-icon">' + icon("building", 48) + '</div><div class="empty-title">\u673A\u6784\u4E0D\u5B58\u5728</div></div>';
      }
      const years = establishedYears(org.establishedYear);
      let html = "";
      html += '<div class="nav-bar">';
      html += '<button class="nav-back" id="p4Back">' + icon("chevron-left", 22) + "</button>";
      html += '<div class="nav-title">' + org.shortName + "</div>";
      html += '<div class="nav-action"></div>';
      html += "</div>";
      html += renderEntityGallery(org, "org");
      html += '<div class="card card-pad" style="margin-top:-24px;position:relative;z-index:10;border-radius:var(--radius-lg);margin-left:var(--space-4);margin-right:var(--space-4);">';
      html += '<div style="font-size:var(--font-lg);font-weight:600;color:var(--color-text-1);margin-bottom:var(--space-1);">' + org.name + "</div>";
      html += '<div style="font-size:var(--font-sm);color:var(--color-text-3);margin-bottom:var(--space-2);">\u6210\u7ACB ' + years + "\u5E74 \xB7 " + org.city + " \xB7 " + org.district + "</div>";
      html += '<div style="font-size:var(--font-sm);color:var(--color-text-2);margin-bottom:var(--space-2);">\u89C4\u6A21 ' + org.scale + "\u4EBA</div>";
      html += '<div class="p4-info-row">';
      for (let index = 0; index < org.fields.length; index += 1) {
        html += '<span class="tag tag-neutral">' + org.fields[index] + "</span>";
      }
      html += "</div>";
      html += "</div>";
      html += '<div class="section" style="margin-top:var(--space-4);">';
      html += '<div class="section-header"><div class="section-title">\u673A\u6784\u7B80\u4ECB</div></div>';
      html += '<div class="card card-pad" style="margin:0 var(--space-4);">';
      html += '<div style="font-size:var(--font-sm);color:var(--color-text-2);line-height:var(--lh-relaxed);">' + org.desc + "</div>";
      html += "</div>";
      html += "</div>";
      html += '<div class="section" style="margin-top:var(--space-3);">';
      html += '<div class="section-header"><div class="section-title">\u673A\u6784\u8D44\u8D28</div></div>';
      html += '<div class="card" style="margin:0 var(--space-4);">';
      html += '<div class="info-row">';
      html += '<div style="display:flex;align-items:center;gap:8px;">';
      html += '<span class="tag tag-verified">' + icon("check-circle", 12) + " \u673A\u6784\u6267\u4E1A\u8D44\u8D28\u5DF2\u6838\u9A8C</span>";
      html += '<span class="info-value">\u5E73\u53F0\u6838\u9A8C \xB7 ' + platformVerificationMonth() + "</span>";
      html += "</div>";
      html += "</div>";
      html += "</div>";
      html += "</div>";
      const teams2 = sortedOrgTeams(org.id);
      html += '<div class="section" style="margin-top:var(--space-3);">';
      html += '<div class="section-header"><div class="section-title">\u5DF2\u4E0A\u67B6\u56E2\u961F</div><div class="section-more">\u5171 ' + teams2.length + " \u4E2A</div></div>";
      html += '<div class="card" style="margin:0 var(--space-4);padding:0 var(--space-4);">';
      html += renderOrgTeamList(teams2);
      html += "</div>";
      html += '<div style="font-size:var(--font-xs);color:var(--color-text-4);padding:var(--space-2) var(--space-4);text-align:center;">\u5339\u914D\u7ED3\u679C\u4E2D\u540C\u4E00\u673A\u6784\u53EA\u63A81\u4E2A\u56E2\u961F\uFF0C\u6B64\u5904\u5217\u5168\u90E8</div>';
      html += "</div>";
      html += '<div style="height:24px;"></div>';
      return html;
    },
    init(params) {
      showTabBar(false);
      const org = getOrg(params.orgId, orgs);
      bindEntityGallery(document, org, "org");
      const backButton = document.getElementById("p4Back");
      if (backButton) backButton.addEventListener("click", goBackToPrevious);
      bindOrgTeamCards();
    }
  };
  register("p4", page5);

  // src/components/anonymousCall.js
  function anonymousCall(team) {
    const name = team ? team.name : "\u670D\u52A1\u56E2\u961F";
    showModal({
      title: "\u533F\u540D\u4EE3\u62E8",
      body: "\u5E73\u53F0\u5C06\u4E3A\u4F60\u63A5\u901A\u300C" + name + "\u300D\u3002<br><br>\xB7 \u53CC\u65B9\u53F7\u7801\u4E92\u4E0D\u53EF\u89C1\uFF0C\u5E73\u53F0\u4E0D\u5411\u4EFB\u4F55\u4E00\u65B9\u5C55\u793A\u771F\u5B9E\u53F7\u7801<br>\xB7 \u5168\u7A0B\u5F55\u97F3\uFF0C\u53EF\u7528\u4E8E\u540E\u7EED\u7EA0\u7EB7\u8FFD\u6EAF<br>\xB7 \u901A\u8BDD\u8BB0\u5F55\u5F52\u5C5E\u672C\u6761\u9700\u6C42",
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4\u62E8\u6253",
      onConfirm() {
        toast("\u6B63\u5728\u901A\u8FC7\u5E73\u53F0\u4E3A\u4F60\u63A5\u901A\u2026");
      }
    });
  }

  // src/domain/delivery.js
  function confirmAcceptance(demand, options = {}) {
    if (!demand || demand.status !== "acceptance") return false;
    const getTime = options.nowLabel || nowLabel;
    const getToday = options.todayLabel || todayLabel;
    demand.status = "done";
    demand.hasReview = false;
    demand.completedDate = getToday();
    demand.progress = "\u670D\u52A1\u5DF2\u5B8C\u6210\uFF0C\u5F85\u8BC4\u4EF7";
    addTimelineEvent(demand, "done", "\u5DF2\u786E\u8BA4\u9A8C\u6536", "\u672C\u6B21\u670D\u52A1\u5DF2\u5B8C\u6210\uFF0C\u53EF\u4EE5\u63D0\u4EA4\u8BC4\u4EF7", getTime);
    return true;
  }

  // src/pages/p6-demand/actions.js
  function changed(result) {
    emitChange();
    return result;
  }
  var actionHandlers = {
    "team-detail": ({ teamId, demand }) => navigateTo("p3", { teamId, sku: demand.sku }),
    "service-detail": ({ teamId, demand }) => navigateTo("p10", { teamId, categoryId: demand.categoryId, sku: demand.sku }),
    chat: ({ teamId, demand, options }) => {
      changed(startCommunication(demand, teamId, options));
      navigateTo("p7", { demandId: demand.id, teamId });
    },
    plan: ({ teamId, demand, options }) => {
      changed(submitServicePlan(demand, teamId, options));
      navigateTo("p7", { demandId: demand.id, teamId, open: "plan" });
    },
    "enter-chat": ({ teamId, demand }) => navigateTo("p7", { demandId: demand.id, teamId: teamId || demand.chosenTeam }),
    "add-service": ({ teamId, demand }) => navigateTo("p7", { demandId: demand.id, teamId: teamId || demand.chosenTeam, open: "change-order" }),
    "anon-call": ({ teamId, demand }) => anonymousCall(getTeam(teamId || demand.chosenTeam, store.teams)),
    "confirm-acceptance": ({ demand, page: page14, options }) => showModal({
      title: "\u786E\u8BA4\u9A8C\u6536\u901A\u8FC7\uFF1F",
      body: "\u8BF7\u786E\u8BA4\u4EA4\u4ED8\u6210\u679C\u7B26\u5408\u5DF2\u786E\u8BA4\u7684\u670D\u52A1\u65B9\u6848\u3002\u9A8C\u6536\u540E\u672C\u6B21\u670D\u52A1\u5C06\u5B8C\u6210\uFF0C\u5E76\u5F00\u653E\u8BC4\u4EF7\u5165\u53E3\u3002",
      cancelText: "\u7EE7\u7EED\u68C0\u67E5",
      confirmText: "\u786E\u8BA4\u9A8C\u6536",
      onConfirm() {
        changed(confirmAcceptance(demand, options));
        toast("\u9A8C\u6536\u5B8C\u6210\uFF0C\u53EF\u4EE5\u8BC4\u4EF7\u4E86");
        page14.refreshPage(demand);
        updateBadge();
      }
    }),
    "go-review": ({ demand }) => navigateTo("p8", { demandId: demand.id }),
    "view-review": ({ demand }) => navigateTo("p8", { demandId: demand.id, readonly: true }),
    "continue-cooperation": ({ demand, page: page14 }) => page14.openContinueCooperation(demand),
    withdraw: ({ demand, page: page14, options }) => showModal({
      title: "\u786E\u8BA4\u64A4\u56DE\u9700\u6C42\uFF1F",
      body: "\u64A4\u56DE\u540E\uFF0C\u5DF2\u54CD\u5E94\u7684\u56E2\u961F\u5C06\u6536\u5230\u901A\u77E5\u3002",
      confirmText: "\u786E\u8BA4\u64A4\u56DE",
      danger: true,
      onConfirm() {
        demand.status = "cancelled";
        demand.progress = "\u5DF2\u53D6\u6D88\xB7\u9700\u6C42\u5DF2\u64A4\u56DE";
        demand.pending = [];
        addTimelineEvent(demand, "cancel", "\u9700\u6C42\u5DF2\u64A4\u56DE", "\u4F60\u4E3B\u52A8\u64A4\u56DE\u4E86\u672C\u6B21\u9700\u6C42\uFF0C\u53EF\u4FEE\u6539\u540E\u91CD\u65B0\u63D0\u4EA4", options.nowLabel);
        emitChange();
        toast("\u5DF2\u64A4\u56DE");
        page14.refreshPage(demand);
        updateBadge();
      }
    }),
    "view-accepted": () => {
      const tab = document.querySelector('[data-p6-tab="teams"]');
      if (tab) tab.click();
    },
    "view-progress": () => {
      const tab = document.querySelector('[data-p6-tab="progress"]');
      if (tab) tab.click();
    },
    "upload-materials": ({ demand, page: page14 }) => page14.openMaterialUpload(demand),
    "open-agreement": ({ teamId, demand }) => navigateTo("p7", { demandId: demand.id, teamId: teamId || demand.chosenTeam, open: "agreement" }),
    "replace-batch": ({ demand, page: page14, options }) => {
      const nextTeams = changed(replaceDemandTeamBatch(demand, options));
      toast(nextTeams.length ? "\u539F\u9700\u6C42\u5DF2\u53D1\u9001\u7ED9\u65B0\u7684\u4E00\u6279\u56E2\u961F" : "\u6682\u65F6\u6CA1\u6709\u66F4\u591A\u7B26\u5408\u6761\u4EF6\u7684\u56E2\u961F");
      page14.refreshPage(demand);
      if (nextTeams.length) {
        simulateResponses(demand.id, (updated) => {
          emitChange();
          page14.refreshPage(updated);
          updateBadge();
        }, options);
      }
    },
    "preview-file": () => toast("\u5DF2\u6253\u5F00\u6210\u679C\u6587\u4EF6\u9884\u89C8"),
    resubmit: ({ demand }) => navigateTo("p5", { demandId: demand.id })
  };
  function runAction(action, context) {
    const handler = actionHandlers[action];
    if (handler) return handler(context);
  }

  // src/pages/p6-demand/StatusBar.js
  function renderStatusBar(demand) {
    const status = demand.status;
    let iconName;
    let iconColor;
    let text;
    if (status === "pending") {
      iconName = "clock";
      iconColor = "var(--color-warning)";
      text = demand.waitedOverHour ? "\u6682\u672A\u6536\u5230\u56E2\u961F\u54CD\u5E94\uFF0C\u53EF\u4EE5\u66F4\u6362\u4E00\u6279\u670D\u52A1\u56E2\u961F" : "\u9700\u6C42\u5DF2\u53D1\u9001\u7ED9 " + (demand.totalInvited || demand.pending.length) + " \u5BB6\u56E2\u961F\uFF0C\u7B49\u5F85\u54CD\u5E94";
    } else if (status === "choosing") {
      iconName = "bell";
      iconColor = "var(--color-warning)";
      text = "\u5DF2\u6709 " + demand.accepted.length + " \u5BB6\u56E2\u961F\u54CD\u5E94\uFF0C\u53EF\u4EE5\u67E5\u770B\u56DE\u590D\u5E76\u8865\u5145\u4FE1\u606F" + (demand.pending.length ? "\uFF0C\u5176\u4F59\u56E2\u961F\u4ECD\u5728\u7B49\u5F85\u4E2D" : "");
    } else if (status === "communicating" || status === "plan_pending") {
      iconName = "message";
      iconColor = "var(--color-primary)";
      text = status === "plan_pending" ? "\u670D\u52A1\u65B9\u6848\u5DF2\u63A8\u9001\uFF0C\u8BF7\u5728\u9700\u6C42\u786E\u8BA4\u9875\u5904\u7406" : "\u5E73\u53F0\u52A9\u624B\u6B63\u5728\u540C\u6B65\u57FA\u7840\u4FE1\u606F\uFF0C\u670D\u52A1\u56E2\u961F\u4F1A\u63A8\u9001\u65B9\u6848\u5361\u7247";
    } else if (status === "contract_pending") {
      iconName = "shield";
      iconColor = "var(--color-warning)";
      const agreementStatus = demand.agreement && demand.agreement.status;
      text = agreementStatus === "provider_signing" ? "\u5BA2\u6237\u534F\u8BAE\u5DF2\u4E0A\u4F20\uFF0C\u7B49\u5F85\u670D\u52A1\u5546\u7528\u5370" : agreementStatus === "auditing" ? "\u53CC\u65B9\u534F\u8BAE\u5DF2\u63D0\u4EA4\uFF0C\u5E73\u53F0\u5BA1\u6838\u4E2D" : "\u670D\u52A1\u65B9\u6848\u5DF2\u786E\u8BA4\uFF0C\u8BF7\u7B7E\u7F72\u670D\u52A1\u534F\u8BAE";
    } else if (status === "active") {
      iconName = "check-circle";
      iconColor = "var(--color-success)";
      text = "\u670D\u52A1\u65B9\u6848\u5DF2\u786E\u8BA4\uFF0C\u56E2\u961F\u6B63\u5728\u6309\u7EA6\u5B9A\u4EA4\u4ED8";
    } else if (status === "acceptance") {
      iconName = "file-text";
      iconColor = "var(--color-warning)";
      text = "\u670D\u52A1\u56E2\u961F\u5DF2\u63D0\u4EA4\u6210\u679C\uFF0C\u8BF7\u68C0\u67E5\u540E\u786E\u8BA4\u9A8C\u6536";
    } else if (status === "done") {
      iconName = "check-circle";
      iconColor = "var(--color-success)";
      text = getDemandStatusText(demand);
    } else {
      iconName = "x-circle";
      iconColor = "var(--color-text-4)";
      text = String(demand.progress || "").indexOf("\u5DF2\u7ED3\u675F") === 0 ? "\u672C\u8F6E\u5339\u914D\u5DF2\u7ED3\u675F\uFF0C\u53EF\u4EE5\u8C03\u6574\u9700\u6C42\u540E\u91CD\u65B0\u53D1\u5E03" : "\u9700\u6C42\u5DF2\u53D6\u6D88";
    }
    return '<div class="p6-status-bar" style="background:' + STATUS_BACKGROUND[status] + ';flex-shrink:0"><span class="p6-status-icon" style="color:' + iconColor + ';display:inline-flex">' + icon(iconName, 18) + '</span><span class="p6-status-text">' + text + "</span></div>";
  }

  // src/pages/p6-demand/Tabs.js
  function getDemandTabs(demand) {
    const status = demand.status;
    const teamCount = (demand.accepted || []).length + (demand.pending || []).length;
    return [
      { key: "progress", label: "\u8FDB\u5EA6" },
      { key: "teams", label: ["pending", "choosing", "communicating", "plan_pending"].includes(status) ? "\u54CD\u5E94\u56E2\u961F" : "\u670D\u52A1\u56E2\u961F", count: teamCount || void 0 },
      { key: "content", label: "\u9700\u6C42\u5185\u5BB9" }
    ];
  }
  function renderDemandTabs(tabs, activeTab) {
    let html = '<div class="p6-tabs" style="flex-shrink:0">';
    tabs.forEach((tab) => {
      const active = tab.key === activeTab ? " active" : "";
      const count = tab.count !== void 0 ? '<span class="p6-tab-count">' + tab.count + "</span>" : "";
      html += '<div class="p6-tab' + active + '" data-p6-tab="' + tab.key + '">' + tab.label + count + "</div>";
    });
    html += "</div>";
    return html;
  }

  // src/pages/p6-demand/tabs/ChatTab.js
  function renderChatTab(demand, getMessages) {
    const teamId = demand.chosenTeam || demand.candidateTeam;
    const messages = teamId ? getMessages(demand.id, teamId) : [];
    let html = '<div style="padding:var(--space-4)"><div style="text-align:center;padding:var(--space-4) 0">';
    html += '<div style="font-size:var(--font-md);color:var(--color-text-2);margin-bottom:var(--space-2)">\u5171' + messages.length + "\u6761\u786E\u8BA4\u8BB0\u5F55</div>";
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const who = lastMessage.type === "user" ? "\u6211" : lastMessage.type === "team" ? "\u670D\u52A1\u56E2\u961F" : lastMessage.type === "ai" ? "\u5E73\u53F0\u52A9\u624B" : "\u7CFB\u7EDF";
      const messageText = lastMessage.text || (lastMessage.type === "plan_card" ? "\u670D\u52A1\u65B9\u6848" : lastMessage.type === "agreement_card" ? "\u670D\u52A1\u534F\u8BAE" : "\u65B0\u6D88\u606F");
      const preview = messageText.length > 30 ? messageText.substring(0, 30) + "..." : messageText;
      html += '<div style="font-size:var(--font-sm);color:var(--color-text-3);line-height:var(--lh-normal)">\u6700\u8FD1\uFF1A' + who + "\uFF1A" + preview + "</div>";
    } else {
      html += '<div style="font-size:var(--font-sm);color:var(--color-text-3)">\u8FD8\u6CA1\u6709\u786E\u8BA4\u8BB0\u5F55\uFF0C\u53EF\u4EE5\u5148\u8865\u5145\u57FA\u7840\u9700\u6C42\u4FE1\u606F</div>';
    }
    html += "</div>";
    if (teamId) html += '<button class="btn btn-primary btn-block" data-p6-action="enter-chat" data-team-id="' + teamId + '">\u67E5\u770B\u9700\u6C42\u786E\u8BA4</button>';
    html += "</div>";
    return html;
  }

  // src/pages/p6-demand/tabs/ContentTab.js
  function renderContentTab(demand) {
    let html = '<div class="p6-demand-card">';
    html += '<div style="font-size:var(--font-md);font-weight:600;margin-bottom:var(--space-3);color:var(--color-text-1)">' + demand.title + "</div>";
    if (demand.fields && demand.fields.length) {
      html += '<div style="margin:0 calc(-1 * var(--space-4))">';
      demand.fields.forEach((field) => {
        html += '<div class="info-row"><span class="info-label">' + field.label + '</span><span class="info-value">' + field.value + "</span></div>";
      });
      html += "</div>";
    }
    if (demand.desc) {
      html += '<div style="margin-top:var(--space-3);font-size:var(--font-sm);color:var(--color-text-3);line-height:var(--lh-normal)">' + demand.desc + "</div>";
    }
    html += "</div>";
    return html;
  }

  // src/pages/p6-demand/tabs/ProgressTab.js
  function renderResponseRoundSummary(demand) {
    const accepted = (demand.accepted || []).length;
    const pending = (demand.pending || []).length;
    const timedOut = (demand.timedOut || []).length;
    const rejected = (demand.rejected || []).length;
    const total = demand.totalInvited || accepted + pending + timedOut + rejected;
    if (demand.waitedOverHour && accepted === 0) {
      return '<div class="p6-timeout-card"><span class="p6-timeout-icon">' + icon("clock", 22) + '</span><div><strong>\u6682\u672A\u6536\u5230\u56E2\u961F\u54CD\u5E94</strong><p>\u53EF\u4EE5\u66F4\u6362\u4E00\u6279\u670D\u52A1\u56E2\u961F\uFF0C\u9700\u6C42\u5185\u5BB9\u65E0\u9700\u91CD\u65B0\u586B\u5199</p></div><button class="btn btn-primary" data-p6-action="replace-batch" type="button">\u6362\u4E00\u6279\u56E2\u961F</button></div>';
    }
    let html = '<div class="p6-round-summary"><div class="p6-round-head"><strong>\u56E2\u961F\u54CD\u5E94\u8FDB\u5EA6</strong><span>' + accepted + "/" + total + " \u5DF2\u54CD\u5E94</span></div>";
    html += '<div class="p6-round-stats"><span>\u7B49\u5F85 ' + pending + "</span><span>\u8D85\u65F6 " + timedOut + "</span><span>\u672A\u627F\u63A5 " + rejected + "</span></div>";
    html += '<div class="p6-round-deadline">' + icon("clock", 14) + "<span>" + (demand.responseClosed ? "\u672C\u8F6E\u54CD\u5E94\u5DF2\u7ED3\u675F" : "\u672C\u8F6E\u5C06\u5728" + (demand.responseDeadline || "\u7EA6\u5B9A\u65F6\u95F4") + "\u622A\u6B62") + "</span></div>";
    html += '<p class="p6-round-note">\u65E0\u9700\u5728\u9875\u9762\u7B49\u5F85\u3002\u56E2\u961F\u54CD\u5E94\u540E\u53EF\u901A\u8FC7\u5E73\u53F0\u52A9\u624B\u8865\u5145\u57FA\u7840\u4FE1\u606F\uFF1B\u6DF1\u5165\u4EA4\u6D41\u7531\u5E73\u53F0\u987E\u95EE\u5728\u4F01\u4E1A\u5FAE\u4FE1\u62C9\u7FA4\u3002</p></div>';
    return html;
  }
  function renderAgreementSummary(demand) {
    const agreement = demand.agreement;
    if (!agreement) return "";
    const copy = {
      customer_action: ["\u5F85\u4F60\u7B7E\u7F72", "\u8865\u5145\u534F\u8BAE\u4FE1\u606F\u3001\u7528\u5370\u5E76\u4E0A\u4F20"],
      provider_signing: ["\u7B49\u5F85\u670D\u52A1\u5546\u7528\u5370", "\u4F60\u4E0A\u4F20\u7684\u534F\u8BAE\u5DF2\u540C\u6B65\u7ED9\u670D\u52A1\u5546"],
      auditing: ["\u5E73\u53F0\u5BA1\u6838\u4E2D", "\u53CC\u65B9\u7528\u5370\u534F\u8BAE\u5DF2\u63D0\u4EA4\u5E73\u53F0\u5BA1\u6838"]
    }[agreement.status] || ["\u534F\u8BAE\u5904\u7406\u4E2D", "\u8BF7\u5728\u670D\u52A1\u8BB0\u5F55\u4E2D\u67E5\u770B\u6700\u65B0\u72B6\u6001"];
    return '<div class="p6-agreement-summary"><span>' + icon("shield", 20) + "</span><div><strong>" + copy[0] + "</strong><small>" + copy[1] + '</small></div><button data-p6-action="open-agreement" data-team-id="' + agreement.teamId + '">\u67E5\u770B\u534F\u8BAE</button></div>';
  }
  function renderPlanTab(demand) {
    const plan = demand.servicePlan;
    if (!plan) return '<div class="empty-state"><div class="empty-icon">' + icon("file-text", 48) + '</div><div class="empty-title">\u670D\u52A1\u65B9\u6848\u5C1A\u672A\u786E\u8BA4</div></div>';
    const pending = demand.status === "plan_pending";
    let html = '<div class="p6-plan-card">';
    html += '<div class="p6-plan-head"><span>' + icon(pending ? "clock" : "check-circle", 18) + "</span><span><strong>" + (pending ? "\u670D\u52A1\u65B9\u6848\u5F85\u786E\u8BA4" : "\u670D\u52A1\u65B9\u6848\u5DF2\u786E\u8BA4") + "</strong><small>" + (pending ? plan.submittedAt || "" : plan.confirmedAt || "") + "</small></span></div>";
    html += '<div class="p6-plan-row"><span>\u670D\u52A1\u5185\u5BB9</span><strong>' + plan.scope + "</strong></div>";
    html += '<div class="p6-plan-row"><span>\u6700\u7EC8\u62A5\u4EF7</span><strong class="p6-plan-price">' + plan.finalQuote + "</strong></div>";
    html += '<div class="p6-plan-row"><span>\u9884\u8BA1\u5468\u671F</span><strong>' + plan.period + "</strong></div>";
    html += '<div class="p6-plan-group"><span>\u4EA4\u4ED8\u6210\u679C</span><ul>' + plan.deliverables.map((item) => "<li>" + item + "</li>").join("") + "</ul></div>";
    html += '<div class="p6-plan-group"><span>\u6240\u9700\u6750\u6599</span><ul>' + plan.materials.map((item) => "<li>" + item + "</li>").join("") + "</ul></div>";
    if (demand.materialFiles && demand.materialFiles.length) html += '<div class="p6-material-files">\u5DF2\u8865\u5145\uFF1A' + demand.materialFiles.join("\u3001") + "</div>";
    if (demand.status === "contract_pending") html += '<button class="btn btn-outline btn-sm" data-p6-action="open-agreement" data-team-id="' + plan.teamId + '">\u67E5\u770B\u670D\u52A1\u534F\u8BAE</button>';
    else if (!pending) html += '<button class="btn btn-outline btn-sm" data-p6-action="upload-materials">\u8865\u5145\u6750\u6599</button>';
    else html += '<button class="btn btn-primary btn-sm" data-p6-action="enter-chat" data-team-id="' + plan.teamId + '">\u67E5\u770B\u5E76\u786E\u8BA4\u65B9\u6848</button>';
    html += "</div>";
    return html;
  }
  function renderDeliveryTab(demand) {
    const delivery = demand.delivery;
    if (!delivery) return '<div class="empty-state"><div class="empty-icon">' + icon("clock", 48) + '</div><div class="empty-title">\u7B49\u5F85\u56E2\u961F\u63D0\u4EA4\u6210\u679C</div></div>';
    let html = '<div class="p6-delivery-card">';
    html += '<div class="p6-delivery-head">' + icon("file-text", 20) + "<span><strong>\u670D\u52A1\u6210\u679C</strong><small>" + (delivery.submittedAt || "") + "</small></span></div>";
    html += "<p>" + delivery.summary + '</p><div class="p6-delivery-files">';
    (delivery.files || []).forEach((file) => {
      html += "<div>" + icon("file-text", 15) + "<span>" + file + '</span><button data-p6-action="preview-file">\u67E5\u770B</button></div>';
    });
    html += "</div>";
    if (demand.status === "acceptance") html += '<div class="p6-delivery-note">\u8BF7\u5148\u6838\u5BF9\u4EA4\u4ED8\u5185\u5BB9\uFF1B\u5982\u6709\u95EE\u9898\uFF0C\u53EF\u5728\u670D\u52A1\u8BB0\u5F55\u4E2D\u63D0\u4EA4\u53CD\u9988\uFF0C\u6DF1\u5165\u6C9F\u901A\u7EE7\u7EED\u5728\u4F01\u4E1A\u5FAE\u4FE1\u7FA4\u8FDB\u884C\u3002</div>';
    html += "</div>";
    return html;
  }
  function renderProgressTab(demand, page14) {
    let html = '<div class="p6-progress-wrap">';
    if (["pending", "choosing", "communicating", "plan_pending"].includes(demand.status)) html += page14.renderResponseRoundSummary(demand);
    html += '<div class="p6-progress-summary">' + (demand.progress || "") + "</div>";
    html += renderDemandTimeline(demand);
    if (demand.servicePlan && ["plan_pending", "contract_pending", "active"].includes(demand.status)) html += page14.renderPlanTab(demand);
    if (demand.agreement && demand.status === "contract_pending") html += page14.renderAgreementSummary(demand);
    if (demand.delivery && ["acceptance", "done"].includes(demand.status)) html += page14.renderDeliveryTab(demand);
    html += "</div>";
    return html;
  }

  // src/components/avatar.js
  function renderAvatar(team, size) {
    const avatarSize = size || "";
    const color = team.avatarColor || "#3A6DF0";
    return '<div class="avatar ' + avatarSize + '" style="background:' + color + "20;color:" + color + '">' + team.avatar + "</div>";
  }

  // src/pages/p6-demand/tabs/TeamsTab.js
  function renderResponseBlocks(item) {
    let html = "";
    if (item.feedback) {
      html += '<div class="p6-resp-block"><div class="p6-resp-block-label">\u56E2\u961F\u56DE\u590D</div><div class="p6-resp-block-text">' + item.feedback + "</div></div>";
    }
    html += '<div class="p6-resp-block"><div class="p6-resp-block-label">\u62A5\u4EF7\u610F\u5411</div><div class="p6-resp-block-text p6-resp-quote-text">' + (item.quote || "\u5F85\u6C9F\u901A\u540E\u786E\u8BA4") + "</div></div>";
    if (item.needMaterials && item.needMaterials.length) {
      html += '<div class="p6-resp-block"><div class="p6-resp-block-label">\u8865\u6750\u6599\u8981\u6C42</div><ul class="p6-resp-mats">';
      item.needMaterials.forEach((material) => {
        html += "<li>" + material + "</li>";
      });
      html += "</ul></div>";
    }
    return html;
  }
  function renderAcceptedTab(demand, findTeam, responseRenderer = renderResponseBlocks) {
    if (!demand.accepted || demand.accepted.length === 0) {
      return '<div class="empty-state"><div class="empty-icon">' + icon("inbox", 48) + '</div><div class="empty-title">\u6682\u65E0\u56E2\u961F\u54CD\u5E94</div><div class="empty-desc">\u56E2\u961F\u54CD\u5E94\u540E\u5373\u53EF\u67E5\u770B\u56DE\u590D\u5E76\u8865\u5145\u9700\u6C42</div></div>';
    }
    const canCompare = ["choosing", "communicating", "plan_pending"].includes(demand.status);
    let html = "";
    demand.accepted.forEach((item) => {
      const team = findTeam(item.teamId);
      html += '<div class="p6-resp-card"><div class="p6-resp-header">';
      html += renderAvatar(team, "avatar-sm");
      html += '<span class="p6-resp-team">' + team.name + "</span>";
      if (team.badge) html += renderBadge(team.badge);
      if (demand.status === "active" && item.teamId === demand.chosenTeam) {
        html += '<span style="color:var(--color-success);display:inline-flex">' + icon("check-circle", 16) + "</span>";
      }
      html += '<span class="p6-resp-time">' + item.time + "</span></div>";
      html += responseRenderer(item);
      html += '<div class="p6-matched-service"><span><small>\u5339\u914D\u670D\u52A1</small><strong>' + demand.sku + '</strong></span><button data-p6-action="service-detail" data-team-id="' + item.teamId + '">\u67E5\u770B\u670D\u52A1\u8BE6\u60C5 ' + icon("chevron-right", 13) + "</button></div>";
      html += '<div class="p6-resp-actions">';
      if (canCompare) {
        html += '<button class="btn btn-primary btn-sm" data-p6-action="chat" data-team-id="' + item.teamId + '">\u8865\u5145\u9700\u6C42\u4FE1\u606F</button>';
        html += '<button class="btn btn-outline btn-sm" data-p6-action="plan" data-team-id="' + item.teamId + '">\u67E5\u770B\u65B9\u6848</button>';
      }
      html += '<button class="p6-team-detail-link" data-p6-action="team-detail" data-team-id="' + item.teamId + '">\u67E5\u770B\u56E2\u961F\u8BE6\u60C5</button>';
      html += "</div></div>";
    });
    return html;
  }
  function renderPendingTab(demand, findTeam) {
    if (!demand.pending || demand.pending.length === 0) {
      return '<div class="empty-state"><div class="empty-icon">' + icon("check-circle", 48) + '</div><div class="empty-title">\u5168\u90E8\u5DF2\u54CD\u5E94</div><div class="empty-desc">\u6CA1\u6709\u5F85\u54CD\u5E94\u7684\u56E2\u961F</div></div>';
    }
    let html = "";
    demand.pending.forEach((item) => {
      const team = findTeam(item.teamId);
      const timeout = item.isTimeout === true;
      html += '<div class="p6-pending-card' + (timeout ? " timeout" : "") + '">';
      html += renderAvatar(team, "avatar-sm");
      html += '<div class="p6-pending-info"><div class="p6-pending-team">' + team.name + "</div>";
      html += '<div class="p6-pending-time">\u5DF2\u901A\u77E5\u56E2\u961F \xB7 ' + item.sentTime + "</div>";
      html += '<div class="p6-pending-time">\u6700\u665A\u4E8E' + (demand.responseDeadline || "\u672C\u8F6E\u622A\u6B62\u524D") + "\u54CD\u5E94</div>";
      if (timeout) html += '<div class="p6-pending-time" style="color:var(--color-danger)">\u8D85\u65F6\u672A\u54CD\u5E94</div>';
      html += "</div></div>";
    });
    return html;
  }
  function renderTimedOutTab(demand, findTeam) {
    const items = demand.timedOut || [];
    if (!items.length) return '<div class="empty-state"><div class="empty-icon">' + icon("clock", 48) + '</div><div class="empty-title">\u6682\u65E0\u8D85\u65F6\u56E2\u961F</div></div>';
    let html = "";
    items.forEach((item) => {
      const team = findTeam(item.teamId);
      html += '<div class="p6-pending-card timeout">' + renderAvatar(team, "avatar-sm") + '<div class="p6-pending-info"><div class="p6-pending-team">' + team.name + '</div><div class="p6-pending-time">\u672A\u5728\u89C4\u5B9A\u65F6\u95F4\u5185\u54CD\u5E94</div><div class="p6-pending-time">\u8BE5\u56E2\u961F\u4E0D\u518D\u53C2\u4E0E\u672C\u8F6E\u9009\u62E9</div></div></div>';
    });
    return html;
  }
  function renderRejectedTab(demand, findTeam) {
    if (!demand.rejected || demand.rejected.length === 0) {
      return '<div class="empty-state"><div class="empty-icon">' + icon("check-circle", 48) + '</div><div class="empty-title">\u65E0\u672A\u627F\u63A5\u8BB0\u5F55</div><div class="empty-desc">\u6240\u6709\u56E2\u961F\u5747\u6B63\u5E38\u54CD\u5E94</div></div>';
    }
    let html = "";
    demand.rejected.forEach((item) => {
      const team = findTeam(item.teamId);
      html += '<div class="p6-reject-card"><div class="p6-reject-team">' + team.name + "</div>";
      html += '<div class="p6-reject-reason">\u672A\u627F\u63A5\u8BF4\u660E\uFF1A' + item.reason + "</div>";
      html += '<div style="font-size:var(--font-xs);color:var(--color-text-4);margin-top:var(--space-2);line-height:var(--lh-normal)">\u672C\u6B21\u672A\u627F\u63A5\u4E0D\u4F1A\u5F71\u54CD\u56E2\u961F\u540E\u7EED\u53C2\u4E0E\u5339\u914D\uFF0C\u4E5F\u4E0D\u8BA1\u5165\u8BC4\u5206</div></div>';
    });
    return html;
  }
  function renderTeamTab(demand, findTeam, responseRenderer = renderResponseBlocks) {
    if (!demand.chosenTeam) {
      return '<div class="empty-state"><div class="empty-icon">' + icon("user", 48) + '</div><div class="empty-title">\u6682\u65E0\u670D\u52A1\u56E2\u961F</div></div>';
    }
    const team = findTeam(demand.chosenTeam);
    const acceptedItem = (demand.accepted || []).find((item) => item.teamId === demand.chosenTeam) || null;
    let html = '<div class="p6-resp-card"><div class="p6-resp-header">';
    html += renderAvatar(team, "avatar-sm");
    html += '<span class="p6-resp-team">' + team.name + "</span>";
    if (team.badge) html += renderBadge(team.badge);
    html += "</div>";
    if (acceptedItem) html += responseRenderer(acceptedItem);
    html += '<div class="p6-resp-actions">';
    if (demand.status === "contract_pending") {
      html += '<button class="btn btn-outline btn-sm" data-p6-action="enter-chat" data-team-id="' + demand.chosenTeam + '">\u67E5\u770B\u786E\u8BA4\u8BB0\u5F55</button>';
      html += '<button class="btn btn-primary btn-sm" data-p6-action="open-agreement" data-team-id="' + demand.chosenTeam + '">\u67E5\u770B\u534F\u8BAE</button>';
    } else if (demand.status === "active" || demand.status === "acceptance") {
      html += '<button class="btn btn-primary btn-sm" data-p6-action="enter-chat" data-team-id="' + demand.chosenTeam + '">\u67E5\u770B\u670D\u52A1\u8BB0\u5F55</button>';
    } else if (demand.status === "done") {
      html += demand.hasReview ? '<button class="btn btn-outline btn-sm" data-p6-action="view-review">\u67E5\u770B\u8BC4\u4EF7</button>' : '<button class="btn btn-primary btn-sm" data-p6-action="go-review">\u53BB\u8BC4\u4EF7</button>';
    }
    html += "</div></div>";
    return html;
  }
  function renderTeamsTab(demand, page14) {
    if (["contract_pending", "active", "acceptance", "done"].includes(demand.status)) return page14.renderTeamTab(demand);
    const blocks = [];
    if ((demand.accepted || []).length) blocks.push('<section class="p6-team-group"><h3>\u5DF2\u54CD\u5E94 ' + demand.accepted.length + "</h3>" + page14.renderAcceptedTab(demand) + "</section>");
    if ((demand.pending || []).length) blocks.push('<section class="p6-team-group"><h3>\u7B49\u5F85\u54CD\u5E94 ' + demand.pending.length + "</h3>" + page14.renderPendingTab(demand) + "</section>");
    if ((demand.timedOut || []).length) blocks.push('<section class="p6-team-group"><h3>\u672A\u5728\u65F6\u9650\u5185\u54CD\u5E94 ' + demand.timedOut.length + "</h3>" + page14.renderTimedOutTab(demand) + "</section>");
    if ((demand.rejected || []).length) blocks.push('<section class="p6-team-group"><h3>\u6682\u672A\u627F\u63A5 ' + demand.rejected.length + "</h3>" + page14.renderRejectedTab(demand) + "</section>");
    if (!blocks.length) return '<div class="empty-state"><div class="empty-icon">' + icon("inbox", 48) + '</div><div class="empty-title">\u6682\u65E0\u56E2\u961F\u8BB0\u5F55</div></div>';
    return '<div class="p6-teams-overview">' + blocks.join("") + "</div>";
  }

  // src/pages/p6-demand/index.js
  var shellHost2 = { clearPageAction, mountPageAction };
  function domainOptions4() {
    return {
      categories,
      chatMessages: store.chatMessages,
      demands: store.demands,
      teams: store.teams,
      user,
      nowLabel,
      todayLabel,
      responseDeadlineLabel,
      isWecomAdded,
      startCommunication,
      createAgreementForDemand
    };
  }
  function renderPageContent2(html, pageId) {
    return setPageContent.call(shellHost2, html, pageId);
  }
  var page6 = {
    state: { demand: null, activeTab: "content" },
    statusTextMap: STATUS_TEXT,
    statusColorMap: STATUS_COLOR,
    statusBarBgMap: STATUS_BACKGROUND,
    getStatusBar(demand) {
      return renderStatusBar(demand);
    },
    getTabs(demand) {
      return getDemandTabs(demand);
    },
    renderTabContent(tabKey, demand) {
      if (tabKey === "content") return this.renderContentTab(demand);
      if (tabKey === "progress") return this.renderProgressTab(demand);
      if (tabKey === "teams") return this.renderTeamsTab(demand);
      if (tabKey === "accepted") return this.renderAcceptedTab(demand);
      if (tabKey === "pending") return this.renderPendingTab(demand);
      if (tabKey === "timedout") return this.renderTimedOutTab(demand);
      if (tabKey === "rejected") return this.renderRejectedTab(demand);
      if (tabKey === "team") return this.renderTeamTab(demand);
      if (tabKey === "chat") return this.renderChatTab(demand);
      if (tabKey === "plan") return this.renderPlanTab(demand);
      if (tabKey === "delivery") return this.renderDeliveryTab(demand);
      return "";
    },
    renderContentTab,
    renderProgressTab(demand) {
      return renderProgressTab(demand, this);
    },
    renderResponseRoundSummary,
    renderAgreementSummary,
    renderPlanTab,
    renderDeliveryTab,
    renderResponseBlocks,
    renderAcceptedTab(demand) {
      return renderAcceptedTab(demand, (teamId) => getTeam(teamId, store.teams), (item) => this.renderResponseBlocks(item));
    },
    renderPendingTab(demand) {
      return renderPendingTab(demand, (teamId) => getTeam(teamId, store.teams));
    },
    renderTimedOutTab(demand) {
      return renderTimedOutTab(demand, (teamId) => getTeam(teamId, store.teams));
    },
    renderRejectedTab(demand) {
      return renderRejectedTab(demand, (teamId) => getTeam(teamId, store.teams));
    },
    renderTeamTab(demand) {
      return renderTeamTab(demand, (teamId) => getTeam(teamId, store.teams), (item) => this.renderResponseBlocks(item));
    },
    renderTeamsTab(demand) {
      return renderTeamsTab(demand, this);
    },
    renderChatTab(demand) {
      return renderChatTab(demand, (demandId, teamId) => getChatMessages(demandId, teamId, store.chatMessages));
    },
    renderBottomBar(demand) {
      const status = demand.status;
      let html = '<div class="bottom-bar" style="position:relative;flex-shrink:0"><div class="p6-bottom-actions" style="flex:1">';
      if (status === "pending") {
        html += '<button class="btn btn-outline" style="flex:1" data-p6-action="withdraw">\u64A4\u56DE\u9700\u6C42</button>';
        html += demand.waitedOverHour ? '<button class="btn btn-primary" style="flex:1" data-p6-action="replace-batch">\u6362\u4E00\u6279\u56E2\u961F</button>' : '<button class="btn btn-primary" style="flex:1" data-p6-action="view-progress">\u67E5\u770B\u54CD\u5E94\u8FDB\u5EA6</button>';
      } else if (["choosing", "communicating", "plan_pending"].includes(status)) {
        html += '<button class="btn btn-outline" style="flex:1" data-p6-action="withdraw">\u64A4\u56DE</button>';
        if (demand.candidateTeam) html += '<button class="btn btn-outline" style="flex:1" data-p6-action="enter-chat" data-team-id="' + demand.candidateTeam + '">\u8865\u5145\u9700\u6C42\u4FE1\u606F</button>';
        html += status === "plan_pending" && demand.candidateTeam ? '<button class="btn btn-primary" style="flex:1" data-p6-action="plan" data-team-id="' + demand.candidateTeam + '">\u786E\u8BA4\u670D\u52A1\u65B9\u6848</button>' : '<button class="btn btn-primary" style="flex:1" data-p6-action="view-accepted">\u67E5\u770B\u54CD\u5E94\u56E2\u961F</button>';
      } else if (status === "contract_pending") {
        html += '<button class="btn btn-outline" style="flex:1" data-p6-action="enter-chat" data-team-id="' + demand.chosenTeam + '">\u67E5\u770B\u786E\u8BA4\u8BB0\u5F55</button>';
        html += '<button class="btn btn-primary" style="flex:1" data-p6-action="open-agreement" data-team-id="' + demand.chosenTeam + '">\u67E5\u770B\u670D\u52A1\u534F\u8BAE</button>';
      } else if (status === "active") {
        html += '<button class="btn btn-outline" style="flex:1" data-p6-action="add-service" data-team-id="' + demand.chosenTeam + '">\u670D\u52A1\u589E\u9879</button>';
        html += '<button class="btn btn-primary" style="flex:1" data-p6-action="enter-chat" data-team-id="' + demand.chosenTeam + '">\u67E5\u770B\u670D\u52A1\u8BB0\u5F55</button>';
      } else if (status === "acceptance") {
        html += '<button class="btn btn-outline" style="flex:1" data-p6-action="enter-chat" data-team-id="' + demand.chosenTeam + '">\u53CD\u9988\u9A8C\u6536\u95EE\u9898</button>';
        html += '<button class="btn btn-primary" style="flex:1" data-p6-action="confirm-acceptance">\u786E\u8BA4\u9A8C\u6536</button>';
      } else if (status === "done") {
        html += '<button class="btn btn-outline" style="flex:1" data-p6-action="continue-cooperation">\u7EE7\u7EED\u5408\u4F5C</button>';
        html += demand.hasReview ? '<button class="btn btn-primary" style="flex:1" data-p6-action="view-review">\u67E5\u770B\u8BC4\u4EF7</button>' : '<button class="btn btn-primary" style="flex:1" data-p6-action="go-review">\u53BB\u8BC4\u4EF7</button>';
      } else if (status === "cancelled") {
        html += '<button class="btn btn-primary" style="flex:1" data-p6-action="resubmit">\u4FEE\u6539\u540E\u91CD\u65B0\u53D1\u5E03</button>';
      }
      html += "</div></div>";
      return html;
    },
    render(params) {
      const demand = getDemand(params.demandId, store.demands);
      if (!demand) {
        return '<div class="empty-state"><div class="empty-icon">' + icon("x-circle", 48) + '</div><div class="empty-title">\u9700\u6C42\u4E0D\u5B58\u5728</div><div class="empty-desc">\u8BE5\u9700\u6C42\u53EF\u80FD\u5DF2\u88AB\u5220\u9664</div></div>';
      }
      this.state.demand = demand;
      const tabs = this.getTabs(demand);
      const legacyTabMap = { accepted: "teams", pending: "teams", timedout: "teams", rejected: "teams", team: "teams", chat: "teams", plan: "progress", delivery: "progress" };
      const requestedTab = legacyTabMap[params.tab] || params.tab;
      let initialTab = "progress";
      if (requestedTab) {
        if (tabs.some((tab) => tab.key === requestedTab)) initialTab = requestedTab;
      } else if (this.state.keepTab) {
        if (tabs.some((tab) => tab.key === this.state.keepTab)) initialTab = this.state.keepTab;
        this.state.keepTab = null;
      }
      this.state.activeTab = initialTab;
      let html = '<div style="display:flex;flex-direction:column;height:100%;position:relative">';
      html += '<div class="nav-bar"><button class="nav-back" id="p6Back">' + icon("chevron-left", 22) + "</button>";
      html += '<div class="nav-title">' + demand.title + '</div><div style="min-width:32px"></div></div>';
      html += this.getStatusBar(demand);
      html += renderDemandTabs(tabs, initialTab);
      html += '<div id="p6-tab-content" style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch">';
      html += this.renderTabContent(initialTab, demand);
      html += "</div>";
      html += this.renderBottomBar(demand);
      html += "</div>";
      return html;
    },
    onRefresh() {
      this.state.keepTab = this.state.activeTab;
    },
    init() {
      const demand = this.state.demand;
      if (!demand) return;
      showTabBar(false);
      const backButton = document.getElementById("p6Back");
      if (backButton) backButton.addEventListener("click", goBackToPrevious);
      const tabElements = document.querySelectorAll("[data-p6-tab]");
      tabElements.forEach((tabElement) => {
        tabElement.addEventListener("click", () => {
          const tabKey = tabElement.getAttribute("data-p6-tab");
          this.state.activeTab = tabKey;
          tabElements.forEach((element) => element.classList.remove("active"));
          tabElement.classList.add("active");
          const content = document.getElementById("p6-tab-content");
          if (content) {
            content.innerHTML = this.renderTabContent(tabKey, demand);
            content.scrollTop = 0;
            this.bindContentHandlers(demand);
          }
        });
      });
      this.bindContentHandlers(demand);
      this.bindBottomHandlers(demand);
    },
    bindContentHandlers(demand) {
      document.querySelectorAll("#p6-tab-content [data-p6-action]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          this.handleAction(button.getAttribute("data-p6-action"), button.getAttribute("data-team-id"), demand);
        });
      });
    },
    bindBottomHandlers(demand) {
      document.querySelectorAll(".bottom-bar [data-p6-action]").forEach((button) => {
        button.addEventListener("click", () => {
          this.handleAction(button.getAttribute("data-p6-action"), button.getAttribute("data-team-id"), demand);
        });
      });
    },
    handleAction(action, teamId, demand) {
      return runAction(action, { action, teamId, demand, page: this, options: domainOptions4() });
    },
    openContinueCooperation(demand) {
      const body = '<div class="p6-cooperation-sheet"><p>\u7EE7\u7EED\u5408\u4F5C\u4F1A\u751F\u6210\u4E00\u6761\u65B0\u9700\u6C42\uFF0C\u539F\u8BA2\u5355\u53CA\u8BC4\u4EF7\u8BB0\u5F55\u4FDD\u6301\u4E0D\u53D8\u3002</p><button class="p6-cooperation-option" id="p6RenewService"><strong>\u7EED\u8D39\u5F53\u524D\u670D\u52A1</strong><span>\u6CBF\u7528\u5F53\u524D\u670D\u52A1\u7C7B\u578B\u548C\u80CC\u666F\u4FE1\u606F</span>' + icon("chevron-right", 16) + '</button><button class="p6-cooperation-option" id="p6AddOtherService"><strong>\u8FFD\u52A0\u5176\u4ED6\u670D\u52A1</strong><span>\u5E26\u5165\u4F01\u4E1A\u4FE1\u606F\uFF0C\u91CD\u65B0\u786E\u8BA4\u670D\u52A1\u5185\u5BB9</span>' + icon("chevron-right", 16) + "</button></div>";
      showSheet({ title: "\u7EE7\u7EED\u5408\u4F5C", body });
      document.getElementById("p6RenewService").addEventListener("click", () => {
        closeAllModals();
        navigateTo("p5", { demandId: demand.id, renew: true, teamId: demand.chosenTeam });
      });
      document.getElementById("p6AddOtherService").addEventListener("click", () => {
        closeAllModals();
        navigateTo("p5", { demandId: demand.id, additional: true, teamId: demand.chosenTeam });
      });
    },
    openMaterialUpload(demand) {
      const body = '<div class="p6-upload-sheet"><p>\u53EF\u8865\u5145\u670D\u52A1\u56E2\u961F\u5728\u65B9\u6848\u4E2D\u5217\u51FA\u7684\u6750\u6599\u3002\u6587\u4EF6\u53EA\u7528\u4E8E\u5F53\u524D\u670D\u52A1\u3002</p><label class="p6-file-picker">' + icon("file-text", 18) + '<span>\u9009\u62E9\u6587\u4EF6</span><input id="p6MaterialInput" type="file" multiple></label><div id="p6MaterialNames" class="p6-material-names">\u5C1A\u672A\u9009\u62E9\u6587\u4EF6</div><button class="btn btn-primary btn-block" id="p6MaterialSave">\u4FDD\u5B58\u6750\u6599</button></div>';
      showSheet({ title: "\u8865\u5145\u6750\u6599", body });
      const input = document.getElementById("p6MaterialInput");
      const names = document.getElementById("p6MaterialNames");
      input.addEventListener("change", function() {
        names.textContent = this.files.length ? Array.prototype.map.call(this.files, (file) => file.name).join("\u3001") : "\u5C1A\u672A\u9009\u62E9\u6587\u4EF6";
      });
      document.getElementById("p6MaterialSave").addEventListener("click", () => {
        if (!input.files.length) {
          toast("\u8BF7\u5148\u9009\u62E9\u6587\u4EF6");
          return;
        }
        demand.materialFiles = Array.prototype.map.call(input.files, (file) => file.name);
        addTimelineEvent(demand, "file", "\u5DF2\u8865\u5145\u670D\u52A1\u6750\u6599", demand.materialFiles.join("\u3001"), nowLabel);
        emitChange();
        closeAllModals();
        toast("\u6750\u6599\u5DF2\u4FDD\u5B58");
        this.refreshPage(demand);
      });
    },
    refreshPage(demand) {
      renderPageContent2(this.render({ demandId: demand.id }), "p6");
      this.init({ demandId: demand.id });
    }
  };
  register("p6", page6);

  // src/components/contactFilter.js
  function filterContact(text) {
    return text.replace(/(\d{3}[-]?\d{4}[-]?\d{4}|\d{11})/g, "***").replace(/(微信[号]?[：:]?\s*[\w\-]{5,20}|加微信|加我微信|vx[：:]?\s*[\w\-]{3,20})/gi, "***");
  }

  // src/domain/changeOrder.js
  function createChangeOrder(demand, description, options = {}) {
    if (!demand || !["active", "acceptance"].includes(demand.status)) return false;
    const messages = options.chatMessages || chatMessages;
    const getTime = options.nowLabel || nowLabel;
    if (!demand.changeOrders) demand.changeOrders = [];
    const presets = {
      \u589E\u52A0\u4E00\u8F6E\u6587\u4EF6\u4FEE\u6539: { fee: 600, days: 2 },
      \u589E\u52A0\u4E13\u9879\u54A8\u8BE2: { fee: 1e3, days: 3 },
      \u589E\u52A0\u4E00\u9879\u4EA4\u4ED8\u6210\u679C: { fee: 1500, days: 5 }
    };
    const preset = presets[description] || { fee: 800, days: 3 };
    const order = {
      id: `CO${String(demand.changeOrders.length + 1).padStart(2, "0")}`,
      description,
      extraFee: `\xA5${preset.fee}`,
      feeValue: preset.fee,
      addedDays: preset.days,
      deliverable: description === "\u589E\u52A0\u4E00\u9879\u4EA4\u4ED8\u6210\u679C" ? "\u65B0\u589E\u4EA4\u4ED8\u6210\u679C 1 \u9879" : "\u66F4\u65B0\u540E\u7684\u670D\u52A1\u6210\u679C\u6587\u4EF6",
      reason: "\u6839\u636E\u65B0\u589E\u9700\u6C42\u8865\u5145\u670D\u52A1\u8303\u56F4",
      validity: "\u63D0\u4EA4\u540E 7 \u5929\u5185\u6709\u6548",
      status: "pending_confirmation",
      createdAt: getTime()
    };
    demand.changeOrders.push(order);
    appendChatMessage(demand.id, demand.chosenTeam, { type: "change_order_card", orderId: order.id }, messages);
    addTimelineEvent(demand, "plan", "\u6536\u5230\u670D\u52A1\u589E\u9879\u65B9\u6848", `${description} \xB7 ${order.extraFee} \xB7 \u589E\u52A0${order.addedDays}\u5929`, getTime);
    return order;
  }
  function confirmChangeOrder(demand, orderId, options = {}) {
    const messages = options.chatMessages || chatMessages;
    const getTime = options.nowLabel || nowLabel;
    const order = (demand.changeOrders || []).find((item) => item.id === orderId);
    if (!order || order.status !== "pending_confirmation") return false;
    order.status = "confirmed";
    order.confirmedAt = getTime();
    const plan = getServicePlan(demand, demand.chosenTeam, options);
    const quoteText = String(plan.finalQuote);
    const currentMatch = quoteText.match(/\d+(?:\.\d+)?/);
    const current = currentMatch ? Number.parseFloat(currentMatch[0]) : 0;
    if (current) {
      plan.finalQuote = quoteText.includes("\u4E07") ? `${Math.round((current + order.feeValue / 1e4) * 100) / 100}\u4E07 \xB7 \u542B\u589E\u9879` : `\xA5${current + order.feeValue}\u8D77`;
    }
    plan.costItems.push({ label: `\u670D\u52A1\u589E\u9879\uFF1A${order.description}`, amount: order.extraFee });
    plan.period = `${plan.period}\uFF0C\u589E\u9879\u589E\u52A0${order.addedDays}\u5929`;
    appendChatMessage(demand.id, demand.chosenTeam, { type: "system", text: "\u670D\u52A1\u589E\u9879\u5DF2\u786E\u8BA4\uFF0C\u8D39\u7528\u548C\u5DE5\u671F\u5DF2\u540C\u6B65\u66F4\u65B0\u5230\u5F53\u524D\u670D\u52A1\u65B9\u6848\u3002" }, messages);
    addTimelineEvent(demand, "choose", "\u5DF2\u786E\u8BA4\u670D\u52A1\u589E\u9879", `${order.description} \xB7 ${order.extraFee}`, getTime);
    return true;
  }

  // src/pages/p7-chat/messageCards/AgreementCard.js
  function renderAgreementCard(demand) {
    const agreement = demand.agreement;
    if (!agreement) return "";
    const state2 = {
      customer_action: ["\u5F85\u4F60\u7B7E\u7F72", "\u8865\u5145\u4FE1\u606F\u3001\u7528\u5370\u5E76\u4E0A\u4F20"],
      provider_signing: ["\u7B49\u5F85\u670D\u52A1\u5546\u7528\u5370", "\u5BA2\u6237\u534F\u8BAE\u5DF2\u4E0A\u4F20"],
      auditing: ["\u5E73\u53F0\u5BA1\u6838\u4E2D", "\u53CC\u65B9\u7528\u5370\u534F\u8BAE\u5DF2\u8FD4\u56DE\uFF0C\u53EF\u67E5\u770B\u6587\u4EF6"],
      approved: ["\u5BA1\u6838\u901A\u8FC7", "\u53CC\u65B9\u534F\u8BAE\u5DF2\u5F52\u6863\uFF0C\u670D\u52A1\u5DF2\u5F00\u59CB"]
    }[agreement.status] || ["\u534F\u8BAE\u5904\u7406\u4E2D", "\u67E5\u770B\u6700\u65B0\u72B6\u6001"];
    return '<div class="p7-structured-wrap"><article class="p7-structured-card p7-agreement-message' + (agreement.status === "approved" ? " confirmed" : "") + '"><div class="p7-structured-head"><span class="p7-structured-icon">' + icon("shield", 17) + "</span><div><strong>\u670D\u52A1\u534F\u8BAE</strong><small>" + escapeHTML(agreement.id) + '</small></div><span class="p7-structured-status">' + state2[0] + '</span></div><div class="p7-agreement-parties"><span><small>\u5BA2\u6237</small><strong>' + escapeHTML(agreement.customer) + "</strong></span><span><small>\u670D\u52A1\u65B9</small><strong>" + escapeHTML(agreement.provider) + "</strong></span></div><p>" + state2[1] + '</p><button class="btn ' + (agreement.status === "customer_action" ? "btn-primary" : "btn-outline") + ' btn-block" data-agreement-open type="button">' + (agreement.status === "customer_action" ? "\u586B\u5199\u5E76\u4E0A\u4F20\u534F\u8BAE" : "\u67E5\u770B\u534F\u8BAE\u8FDB\u5EA6") + "</button></article></div>";
  }

  // src/pages/p7-chat/messageCards/ChangeOrderCard.js
  function renderChangeOrderCard(order) {
    const confirmed = order.status === "confirmed";
    return '<div class="p7-structured-wrap"><article class="p7-structured-card change-order-card"><div class="p7-structured-head"><span class="p7-structured-icon">' + icon("file-text", 17) + "</span><div><strong>\u670D\u52A1\u589E\u9879</strong><small>" + escapeHTML(order.createdAt) + '</small></div><span class="p7-structured-status">' + (confirmed ? "\u5DF2\u786E\u8BA4" : "\u5F85\u786E\u8BA4") + '</span></div><div class="p7-change-title">' + escapeHTML(order.description) + '</div><div class="p7-change-metrics"><span><small>\u589E\u52A0\u8D39\u7528</small><strong>' + escapeHTML(order.extraFee) + "</strong></span><span><small>\u589E\u52A0\u5DE5\u671F</small><strong>" + Number(order.addedDays || 0) + " \u5929</strong></span></div>" + (!confirmed ? '<div class="p7-card-actions"><button class="btn btn-outline" data-change-chat>\u8865\u5145\u8BF4\u660E</button><button class="btn btn-primary" data-change-confirm="' + escapeHTML(order.id) + '">\u786E\u8BA4\u589E\u9879</button></div>' : "") + "</article></div>";
  }

  // src/pages/p7-chat/messageCards/PlanCard.js
  function renderPlanCard(message, demand, team, getVersion, getCurrent) {
    const plan = getVersion(message.version);
    if (!plan) return "";
    const current = getCurrent();
    const latest = Number(plan.version || 1) === Number(current.version || 1);
    const confirmed = Boolean(current.confirmedAt) && latest;
    const status = confirmed ? "\u5DF2\u786E\u8BA4" : latest ? "\u5F85\u4F60\u786E\u8BA4" : "\u5DF2\u66F4\u65B0";
    return '<div class="p7-structured-wrap"><article class="p7-structured-card p7-plan-message' + (!latest ? " superseded" : "") + (confirmed ? " confirmed" : "") + '"><div class="p7-structured-head"><span class="p7-structured-icon">' + icon("file-text", 17) + "</span><div><strong>\u670D\u52A1\u65B9\u6848</strong><small>" + escapeHTML(plan.submittedAt || "") + '</small></div><span class="p7-structured-status">' + status + "</span></div>" + (plan.changeSummary && latest ? '<div class="p7-plan-change-note">' + icon("refresh", 14) + "<span>" + escapeHTML(plan.changeSummary) + "</span></div>" : "") + '<div class="p7-plan-message-service"><span><small>\u5339\u914D\u670D\u52A1</small><strong>' + escapeHTML(demand.sku) + '</strong></span><button type="button" data-plan-service>\u67E5\u770B\u670D\u52A1\u8BE6\u60C5 ' + icon("chevron-right", 13) + '</button></div><div class="p7-plan-message-metrics"><span><small>\u670D\u52A1\u62A5\u4EF7</small><strong>' + escapeHTML(plan.finalQuote) + "</strong></span><span><small>\u9884\u8BA1\u5468\u671F</small><strong>" + escapeHTML(plan.period) + "</strong></span></div><p>" + escapeHTML(plan.scope) + '</p><div class="p7-card-actions"><button class="btn btn-outline" data-plan-view="' + Number(plan.version || 1) + '">\u67E5\u770B\u5B8C\u6574\u65B9\u6848</button>' + (!confirmed && latest ? '<button class="btn btn-primary" data-plan-confirm>\u786E\u8BA4\u65B9\u6848</button>' : "") + "</div></article></div>";
  }

  // src/pages/p7-chat/messageCards/RequirementCard.js
  function renderRequirementCard(demand, team) {
    if (!demand.directInquiry || demand.requirementConfirmed) return "";
    const fields = demand.fields || [];
    return '<div class="p7-structured-wrap"><article class="p7-structured-card p7-requirement-card"><div class="p7-structured-head"><span class="p7-structured-icon">' + icon("check-circle", 17) + "</span><div><strong>\u786E\u8BA4\u672C\u6B21\u670D\u52A1\u9700\u6C42</strong><small>\u786E\u8BA4\u540E\u540C\u6B65\u7ED9" + escapeHTML(team.name) + '</small></div></div><div class="p7-requirement-fields">' + fields.map((field, index) => {
      const fixed = field.label === "\u670D\u52A1\u7C7B\u578B" || field.label === "\u610F\u5411\u56E2\u961F";
      return "<label><span>" + escapeHTML(field.label) + '</span><input data-requirement-index="' + index + '" value="' + escapeHTML(field.value) + '"' + (fixed ? " readonly" : "") + "></label>";
    }).join("") + '</div><button class="btn btn-primary btn-block" data-requirement-confirm type="button">\u786E\u8BA4\u5E76\u53D1\u9001\u7ED9\u56E2\u961F</button></article></div>';
  }

  // src/pages/p7-chat/messageCards/WecomCard.js
  function renderWecomMessage(demand) {
    const readyForConnection = demand.directInquiry ? demand.requirementConfirmed : ["communicating", "plan_pending", "contract_pending", "active", "acceptance"].includes(demand.status);
    if (!readyForConnection || isWecomAdded()) return "";
    return '<div class="p7-structured-wrap"><article class="p7-structured-card p7-wecom-message"><div class="p7-structured-head"><span class="p7-structured-icon">' + icon("bell", 17) + '</span><div><strong>\u6DFB\u52A0\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1\uFF0C\u7EE7\u7EED\u4E0E\u56E2\u961F\u5EFA\u8054</strong><small>\u5E73\u53F0\u987E\u95EE\u4F1A\u9080\u8BF7\u4F60\u548C\u670D\u52A1\u56E2\u961F\u8FDB\u5165\u4F01\u4E1A\u5FAE\u4FE1\u7FA4</small></div></div><p>\u5C0F\u7A0B\u5E8F\u5185\u7684\u52A9\u624B\u7528\u4E8E\u6536\u96C6\u57FA\u7840\u4FE1\u606F\u548C\u5C55\u793A\u7ED3\u6784\u5316\u5361\u7247\uFF0C\u540E\u7EED\u9700\u6C42\u8BA8\u8BBA\u4E0E\u534F\u4F5C\u5728\u4F01\u4E1A\u5FAE\u4FE1\u8FDB\u884C\u3002</p><button class="btn btn-primary btn-block" data-wecom-open type="button">\u67E5\u770B\u4F01\u4E1A\u5FAE\u4FE1\u4E8C\u7EF4\u7801</button></article></div>';
  }

  // src/pages/p7-chat/quickReplies.js
  var QUICK_REPLIES = Object.freeze({
    plan_pending: ["\u65B9\u6848\u5177\u4F53\u5305\u542B\u54EA\u4E9B\u670D\u52A1\uFF1F", "\u8FD9\u4E2A\u62A5\u4EF7\u53EF\u4EE5\u8C03\u6574\u5417\uFF1F", "\u6700\u7EC8\u4F1A\u4EA4\u4ED8\u54EA\u4E9B\u6210\u679C\uFF1F"],
    contract_pending: ["\u534F\u8BAE\u9700\u8981\u8865\u5145\u54EA\u4E9B\u4FE1\u606F\uFF1F", "\u4ED8\u6B3E\u65B9\u5F0F\u5199\u5728\u54EA\u91CC\uFF1F", "\u670D\u52A1\u4EC0\u4E48\u65F6\u5019\u5F00\u59CB\uFF1F"],
    service: ["\u5F53\u524D\u8FDB\u5C55\u5230\u54EA\u4E00\u6B65\u4E86\uFF1F", "\u8FD8\u9700\u8981\u6211\u63D0\u4F9B\u4EC0\u4E48\u6750\u6599\uFF1F", "\u9884\u8BA1\u4EC0\u4E48\u65F6\u5019\u80FD\u5B8C\u6210\uFF1F"],
    default: ["\u80FD\u4ECB\u7ECD\u4E00\u4E0B\u76F8\u5173\u9879\u76EE\u7ECF\u9A8C\u5417\uFF1F", "\u65B9\u6848\u5177\u4F53\u5305\u542B\u54EA\u4E9B\u670D\u52A1\uFF1F", "\u9700\u8981\u6211\u63D0\u4F9B\u4EC0\u4E48\u6750\u6599\uFF1F"]
  });
  function getQuickReplies(demand) {
    if (demand.status === "plan_pending") return QUICK_REPLIES.plan_pending;
    if (demand.status === "contract_pending") return QUICK_REPLIES.contract_pending;
    if (["active", "acceptance", "done"].includes(demand.status)) return QUICK_REPLIES.service;
    return QUICK_REPLIES.default;
  }

  // src/pages/p7-chat/index.js
  var shellHost3 = { clearPageAction, mountPageAction };
  function domainOptions5() {
    return {
      categories,
      chatMessages: store.chatMessages,
      demands: store.demands,
      teams: store.teams,
      user,
      nowLabel,
      todayLabel,
      responseDeadlineLabel,
      isWecomAdded,
      startCommunication,
      createAgreementForDemand
    };
  }
  function changed2(result) {
    emitChange();
    return result;
  }
  function renderPageContent3(html, pageId) {
    return setPageContent.call(shellHost3, html, pageId);
  }
  var page7 = {
    state: { demand: null, team: null, params: {} },
    isTeamRelated(demand, teamId) {
      if (!demand || !teamId) return false;
      if (demand.chosenTeam === teamId || demand.candidateTeam === teamId || demand.targetTeamId === teamId) return true;
      return Boolean(getAcceptedRecord(demand, teamId));
    },
    isFormalService(demand, teamId) {
      return ["contract_pending", "active", "acceptance", "done"].includes(demand.status) && demand.chosenTeam === teamId;
    },
    getPlan(version) {
      return version ? getServicePlanVersion(this.state.demand, this.state.team.id, version, domainOptions5()) : getServicePlan(this.state.demand, this.state.team.id, domainOptions5());
    },
    getQuickReplies,
    renderPlanCard(message, demand, team) {
      return renderPlanCard(
        message,
        demand,
        team,
        (version) => getServicePlanVersion(demand, team.id, version, domainOptions5()),
        () => getServicePlan(demand, team.id, domainOptions5())
      );
    },
    renderAgreementCard,
    renderRequirementCard,
    renderWecomMessage,
    renderChangeOrderCard,
    renderMessage(message, team, demand) {
      if (message.type === "plan_card" || message.type === "quote_card") return this.renderPlanCard(message, demand, team);
      if (message.type === "agreement_card") return this.renderAgreementCard(demand);
      if (message.type === "change_order_card") {
        const order = (demand.changeOrders || []).find((item) => item.id === message.orderId);
        return order ? this.renderChangeOrderCard(order) : "";
      }
      if (message.type === "system") return '<div class="chat-msg-row system"><div class="chat-system-msg">' + escapeHTML(message.text) + "</div></div>";
      if (message.type === "team") return '<div class="p7-team-update"><div class="p7-team-update-head"><span style="background:' + team.avatarColor + '">' + team.avatar + "</span><div><strong>\u670D\u52A1\u56E2\u961F\u56DE\u590D</strong><small>" + escapeHTML(team.name) + " \xB7 \u7531\u5E73\u53F0\u540C\u6B65</small></div></div><p>" + escapeHTML(message.text) + "</p></div>";
      if (message.type === "ai") return '<div class="chat-msg-row ai"><div class="chat-avatar p7-assistant-avatar">\u52A9</div><div class="chat-bubble chat-bubble-ai"><small class="p7-assistant-label">\u5E73\u53F0\u9700\u6C42\u52A9\u624B</small>' + escapeHTML(message.text) + "</div></div>";
      return '<div class="chat-msg-row user"><div class="chat-bubble chat-bubble-user">' + escapeHTML(message.text) + "</div></div>";
    },
    render(params) {
      const renderParams = params || {};
      const demand = getDemand(renderParams.demandId, store.demands);
      const team = getTeam(renderParams.teamId, store.teams);
      if (!demand || !team || !this.isTeamRelated(demand, team.id)) {
        this.state = { demand: null, team: null, params: renderParams };
        return '<div class="nav-bar"><button class="nav-back" id="p7Back">' + icon("chevron-left", 22) + '</button><div class="nav-title">\u9700\u6C42\u786E\u8BA4\u8BB0\u5F55</div><div style="width:32px"></div></div><div class="empty-state"><div class="empty-icon">' + icon("x-circle", 48) + '</div><div class="empty-title">\u9700\u6C42\u786E\u8BA4\u8BB0\u5F55\u4E0D\u5B58\u5728</div></div>';
      }
      this.state = { demand, team, params: renderParams };
      const messages = getChatMessages(demand.id, team.id, store.chatMessages);
      const quickReplies = this.getQuickReplies(demand);
      let renderedAgreement = false;
      const renderedOrders = {};
      const hasTeamMessage = messages.some((item) => item.type === "team" || item.type === "ai");
      let html = '<div class="p7-page"><div class="nav-bar"><button class="nav-back" id="p7Back">' + icon("chevron-left", 22) + '</button><div class="nav-title p7-nav-title"><span>' + escapeHTML(team.name) + '</span><small>\u5E73\u53F0\u9700\u6C42\u52A9\u624B \xB7 \u975E\u5B9E\u65F6</small></div><div class="p7-nav-spacer"></div></div><div class="p7-warn-bar"><span>' + icon("shield", 14) + '</span><span>\u5E73\u53F0\u52A9\u624B\u8D1F\u8D23\u6536\u96C6\u548C\u540C\u6B65\u57FA\u7840\u4FE1\u606F\uFF1B\u6DF1\u5165\u4EA4\u6D41\u7531\u5E73\u53F0\u987E\u95EE\u5728\u4F01\u4E1A\u5FAE\u4FE1\u62C9\u7FA4\u3002</span></div><button class="p7-service-context" id="p7ServiceContext" type="button"><span><small>\u672C\u6B21\u54A8\u8BE2\u670D\u52A1</small><strong>' + escapeHTML(demand.sku) + "</strong></span><em>\u67E5\u770B\u670D\u52A1\u8BE6\u60C5 " + icon("chevron-right", 13) + '</em></button><div class="p7-chat-area" id="p7ChatArea">';
      if (!hasTeamMessage) html += '<div class="p7-chat-guide"><strong>\u5148\u786E\u8BA4\u57FA\u7840\u670D\u52A1\u4FE1\u606F</strong><span>\u4F60\u53EF\u4EE5\u8865\u5145\u670D\u52A1\u8303\u56F4\u3001\u9884\u7B97\u3001\u5468\u671F\u548C\u6750\u6599\u8981\u6C42\u3002\u5E73\u53F0\u52A9\u624B\u4F1A\u6574\u7406\u540E\u540C\u6B65\u7ED9\u56E2\u961F\u3002</span></div><div class="chat-msg-row ai"><div class="chat-avatar p7-assistant-avatar">\u52A9</div><div class="chat-bubble chat-bubble-ai"><small class="p7-assistant-label">\u5E73\u53F0\u9700\u6C42\u52A9\u624B</small>\u6211\u4F1A\u5148\u5E2E\u4F60\u6574\u7406\u9700\u6C42\u5E76\u540C\u6B65\u7ED9' + escapeHTML(team.name) + "\u3002\u9700\u8981\u8FDB\u4E00\u6B65\u8BA8\u8BBA\u65F6\uFF0C\u5E73\u53F0\u987E\u95EE\u4F1A\u901A\u8FC7\u4F01\u4E1A\u5FAE\u4FE1\u62C9\u7FA4\u3002</div></div>";
      messages.forEach((message) => {
        if (message.type === "agreement_card") renderedAgreement = true;
        if (message.type === "change_order_card") renderedOrders[message.orderId] = true;
        html += this.renderMessage(message, team, demand);
      });
      (demand.changeOrders || []).forEach((order) => {
        if (!renderedOrders[order.id]) html += this.renderChangeOrderCard(order);
      });
      html += this.renderRequirementCard(demand, team);
      if (demand.agreement && !renderedAgreement) html += this.renderAgreementCard(demand);
      html += this.renderWecomMessage(demand);
      html += '</div><div class="p7-composer"><div class="p7-quick-replies" aria-label="\u5FEB\u6377\u63D0\u95EE">' + quickReplies.map(
        (text) => '<button type="button" data-quick-reply="' + escapeHTML(text) + '">' + escapeHTML(text) + "</button>"
      ).join("") + '</div><div class="p7-input-bar"><input type="text" id="p7Input" placeholder="\u8865\u5145\u9700\u6C42\u4FE1\u606F\u2026" aria-label="\u8865\u5145\u9700\u6C42\u4FE1\u606F"><button class="p7-send-btn" id="p7SendBtn" aria-label="\u53D1\u9001\u7ED9\u5E73\u53F0\u52A9\u624B">' + icon("send", 15) + "</button></div></div></div>";
      return html;
    },
    init(params) {
      showTabBar(false);
      const demand = this.state.demand;
      const team = this.state.team;
      const backButton = document.getElementById("p7Back");
      if (backButton) backButton.addEventListener("click", goBackToPrevious);
      if (!demand || !team) return;
      if (demand.status === "choosing") changed2(startCommunication(demand, team.id, domainOptions5()));
      const service = document.getElementById("p7ServiceContext");
      if (service) service.addEventListener("click", () => navigateTo("p10", { teamId: team.id, categoryId: demand.categoryId, sku: demand.sku }));
      document.querySelectorAll("[data-quick-reply]").forEach((button) => button.addEventListener("click", () => this.fillSuggestion(button.getAttribute("data-quick-reply"))));
      document.querySelectorAll("[data-plan-view]").forEach((button) => button.addEventListener("click", () => this.openPlan(Number(button.getAttribute("data-plan-view")))));
      document.querySelectorAll("[data-plan-confirm]").forEach((button) => button.addEventListener("click", () => this.confirmPlan()));
      document.querySelectorAll("[data-plan-service]").forEach((button) => button.addEventListener("click", () => navigateTo("p10", { teamId: team.id, categoryId: demand.categoryId, sku: demand.sku })));
      document.querySelectorAll("[data-agreement-open]").forEach((button) => button.addEventListener("click", () => this.openAgreement()));
      document.querySelectorAll("[data-wecom-open]").forEach((button) => button.addEventListener("click", () => openWecomGuide("serviceConnection")));
      document.querySelectorAll("[data-change-chat]").forEach((button) => button.addEventListener("click", () => this.fillSuggestion("\u6211\u60F3\u7EE7\u7EED\u786E\u8BA4\u8FD9\u9879\u589E\u9879\u7684\u8303\u56F4\u3001\u8D39\u7528\u548C\u5DE5\u671F\u3002")));
      document.querySelectorAll("[data-change-confirm]").forEach((button) => button.addEventListener("click", () => this.confirmChangeOrder(button.getAttribute("data-change-confirm"))));
      const confirmRequirementButton = document.querySelector("[data-requirement-confirm]");
      if (confirmRequirementButton) confirmRequirementButton.addEventListener("click", () => this.confirmRequirement());
      const input = document.getElementById("p7Input");
      const draftKey = "ecologyChatDraft:" + demand.id + ":" + team.id;
      input.value = readText(draftKey, "") || "";
      input.addEventListener("input", function() {
        writeText(draftKey, this.value);
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") this.sendMessage();
      });
      document.getElementById("p7SendBtn").addEventListener("click", () => this.sendMessage());
      const area = document.getElementById("p7ChatArea");
      if (area) area.scrollTop = area.scrollHeight;
      if (params.open === "plan") setTimeout(() => this.openPlan(), 80);
      if (params.open === "agreement") setTimeout(() => this.openAgreement(), 80);
      if (params.open === "change-order") setTimeout(() => this.openChangeOrderSheet(), 80);
      updateBadge();
    },
    fillSuggestion(text) {
      const input = document.getElementById("p7Input");
      if (!input) return;
      input.value = text;
      input.focus();
    },
    filterContact,
    sendMessage() {
      const input = document.getElementById("p7Input");
      if (!input || !input.value.trim()) return;
      const demand = this.state.demand;
      const team = this.state.team;
      const safeText = filterContact(input.value.trim());
      input.value = "";
      appendChatMessage(demand.id, team.id, { type: "user", text: safeText }, store.chatMessages);
      emitChange();
      if (safeText.includes("***")) toast("\u8054\u7CFB\u65B9\u5F0F\u5DF2\u9690\u85CF\uFF0C\u9700\u8981\u6DF1\u5165\u4EA4\u6D41\u65F6\u8BF7\u6DFB\u52A0\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1");
      this.refreshPage();
      setTimeout(() => {
        if (!getDemand(demand.id, store.demands)) return;
        appendChatMessage(demand.id, team.id, { type: "ai", text: "\u5DF2\u8BB0\u5F55\u5E76\u540C\u6B65\u7ED9\u670D\u52A1\u56E2\u961F\u3002\u56E2\u961F\u7684\u56DE\u590D\u548C\u670D\u52A1\u65B9\u6848\u4F1A\u4EE5\u5361\u7247\u5F62\u5F0F\u51FA\u73B0\u5728\u8FD9\u91CC\uFF1B\u9700\u8981\u6DF1\u5165\u4EA4\u6D41\u65F6\uFF0C\u5E73\u53F0\u987E\u95EE\u4F1A\u5728\u4F01\u4E1A\u5FAE\u4FE1\u62C9\u7FA4\u3002" }, store.chatMessages);
        emitChange();
        const hasPlan = getChatMessages(demand.id, team.id, store.chatMessages).some((message) => message.type === "plan_card");
        if (!hasPlan && (!demand.directInquiry || demand.requirementConfirmed)) changed2(submitServicePlan(demand, team.id, domainOptions5()));
        this.refreshPage();
      }, 700);
    },
    confirmRequirement() {
      const demand = this.state.demand;
      const team = this.state.team;
      document.querySelectorAll("[data-requirement-index]").forEach((input) => {
        const field = demand.fields[Number(input.getAttribute("data-requirement-index"))];
        if (field) field.value = input.value.trim() || "\u672A\u63D0\u4F9B";
      });
      changed2(confirmDirectRequirement(demand, team.id, domainOptions5()));
      changed2(submitServicePlan(demand, team.id, domainOptions5()));
      this.refreshPage();
      toast("\u9700\u6C42\u5DF2\u786E\u8BA4\u5E76\u540C\u6B65\u7ED9\u56E2\u961F");
      if (!isWecomAdded()) setTimeout(() => openWecomGuide("serviceConnection"), 260);
    },
    openPlan(version) {
      const demand = this.state.demand;
      const team = this.state.team;
      const plan = this.getPlan(version);
      if (!plan) {
        toast("\u670D\u52A1\u65B9\u6848\u5C1A\u672A\u63D0\u4EA4");
        return;
      }
      const current = this.getPlan();
      const currentVersion = Number(plan.version || 1) === Number(current.version || 1);
      const confirmed = Boolean(current.confirmedAt) && currentVersion;
      const list = (items) => '<ul class="p7-plan-list">' + (items || []).map((item) => "<li>" + escapeHTML(item) + "</li>").join("") + "</ul>";
      const costs = (plan.costItems || []).map((item) => '<div class="p7-cost-row"><span>' + escapeHTML(item.label) + "</span><strong>" + escapeHTML(item.amount) + "</strong></div>").join("");
      const body = '<div class="p7-plan-detail"><div class="p7-plan-version"><strong>\u670D\u52A1\u65B9\u6848</strong><span>' + (confirmed ? "\u5DF2\u786E\u8BA4" : currentVersion ? "\u5F85\u4F60\u786E\u8BA4" : "\u5DF2\u66F4\u65B0") + "</span></div>" + (plan.changeSummary && currentVersion ? '<div class="p7-plan-change-note">' + icon("refresh", 14) + "<span>" + escapeHTML(plan.changeSummary) + " \xB7 " + escapeHTML(plan.submittedAt || "") + "</span></div>" : "") + '<button class="p7-plan-sku-link" id="p7PlanServiceLink" type="button"><span><small>\u672C\u65B9\u6848\u57FA\u4E8E</small><strong>' + escapeHTML(demand.sku) + "</strong></span>\u67E5\u770B\u670D\u52A1\u8BE6\u60C5 " + icon("chevron-right", 13) + '</button><div class="p7-plan-row"><span>\u670D\u52A1\u56E2\u961F</span><strong>' + escapeHTML(team.name) + '</strong></div><div class="p7-plan-row"><span>\u670D\u52A1\u8303\u56F4</span><strong>' + escapeHTML(plan.scope) + '</strong></div><div class="p7-plan-row"><span>\u670D\u52A1\u62A5\u4EF7</span><strong>' + escapeHTML(plan.finalQuote) + '</strong></div><div class="p7-plan-row"><span>\u9884\u8BA1\u5468\u671F</span><strong>' + escapeHTML(plan.period) + '</strong></div><div class="p7-plan-group"><span>\u8D39\u7528\u660E\u7EC6</span><div class="p7-cost-list">' + costs + '</div></div><div class="p7-plan-group"><span>\u4EA4\u4ED8\u6210\u679C</span>' + list(plan.deliverables) + '</div><div class="p7-plan-group"><span>\u4E0D\u5305\u542B\u4E8B\u9879</span>' + list(plan.exclusions) + '</div><div class="p7-plan-group"><span>\u4ED8\u6B3E\u65B9\u5F0F</span>' + list(plan.paymentMilestones) + '</div><div class="p7-plan-group"><span>\u9700\u8981\u63D0\u4F9B</span>' + list(plan.materials) + '</div><div class="p7-plan-attachment">' + icon("file-text", 16) + "<span>" + escapeHTML(plan.attachment) + '</span><button type="button" id="p7PlanPreview">\u9884\u89C8</button></div>' + (!confirmed && currentVersion ? '<div class="p7-plan-actions"><button class="btn btn-outline" id="p7BackToChat">\u7A0D\u540E\u786E\u8BA4</button><button class="btn btn-primary" id="p7ConfirmPlan">\u786E\u8BA4\u65B9\u6848</button></div>' : "") + "</div>";
      showSheet({ title: "\u670D\u52A1\u65B9\u6848\u4E0E\u62A5\u4EF7", body });
      document.getElementById("p7PlanServiceLink").addEventListener("click", () => {
        closeAllModals();
        navigateTo("p10", { teamId: team.id, categoryId: demand.categoryId, sku: demand.sku });
      });
      document.getElementById("p7PlanPreview").addEventListener("click", () => toast("\u5DF2\u6253\u5F00\u670D\u52A1\u65B9\u6848\u9884\u89C8"));
      const back = document.getElementById("p7BackToChat");
      if (back) back.addEventListener("click", closeAllModals);
      const confirm = document.getElementById("p7ConfirmPlan");
      if (confirm) confirm.addEventListener("click", () => this.confirmPlan());
    },
    confirmPlan() {
      const demand = this.state.demand;
      const team = this.state.team;
      closeAllModals();
      showModal({
        title: "\u786E\u8BA4\u8FD9\u4EFD\u670D\u52A1\u65B9\u6848\uFF1F",
        body: "\u786E\u8BA4\u65B9\u6848\u5373\u9009\u5B9A" + escapeHTML(team.name) + "\u3002\u4E0B\u4E00\u6B65\u7531\u53CC\u65B9\u7B7E\u7F72\u670D\u52A1\u534F\u8BAE\uFF0C\u5E73\u53F0\u5BA1\u6838\u901A\u8FC7\u540E\u5F00\u59CB\u4EA4\u4ED8\u3002",
        cancelText: "\u7A0D\u540E\u786E\u8BA4",
        confirmText: "\u786E\u8BA4\u65B9\u6848",
        onConfirm: () => {
          changed2(confirmServicePlan(demand, team.id, domainOptions5()));
          this.refreshPage();
          this.showAgreementReady();
          updateBadge();
        }
      });
    },
    showAgreementReady() {
      showSheet({
        title: "\u56E2\u961F\u5DF2\u9009\u5B9A",
        body: '<div class="p7-success-state"><span class="p7-success-icon">' + icon("check", 22) + '</span><strong>\u670D\u52A1\u65B9\u6848\u5DF2\u786E\u8BA4</strong><p>\u4E0B\u4E00\u6B65\u8BF7\u8865\u5145\u534F\u8BAE\u4FE1\u606F\u3001\u5B8C\u6210\u7528\u5370\u5E76\u4E0A\u4F20\u3002\u670D\u52A1\u5546\u7528\u5370\u540E\uFF0C\u5E73\u53F0\u4F1A\u5BA1\u6838\u53CC\u65B9\u534F\u8BAE\u3002</p><div class="p7-success-actions"><button class="btn btn-outline" id="p7ContinueChat">\u7A0D\u540E\u5904\u7406</button><button class="btn btn-primary" id="p7SignAgreement">\u7B7E\u7F72\u534F\u8BAE</button></div></div>'
      });
      document.getElementById("p7ContinueChat").addEventListener("click", closeAllModals);
      document.getElementById("p7SignAgreement").addEventListener("click", () => {
        closeAllModals();
        this.openAgreement();
      });
    },
    openAgreement() {
      const demand = this.state.demand;
      const agreement = demand.agreement;
      if (!agreement) {
        toast("\u670D\u52A1\u534F\u8BAE\u5C1A\u672A\u53D1\u8D77");
        return;
      }
      const stateCopy = {
        customer_action: ["\u5F85\u4F60\u7B7E\u7F72", "\u8BF7\u4E0B\u8F7D\u670D\u52A1\u5546\u63D0\u4F9B\u7684\u534F\u8BAE\u6A21\u677F\uFF0C\u8865\u5145\u4F01\u4E1A\u4FE1\u606F\u5E76\u5B8C\u6210\u7528\u5370\uFF0C\u518D\u4E0A\u4F20\u626B\u63CF\u4EF6\u3002"],
        provider_signing: ["\u7B49\u5F85\u670D\u52A1\u5546\u7528\u5370", "\u4F60\u4E0A\u4F20\u7684\u534F\u8BAE\u5DF2\u540C\u6B65\u7ED9\u670D\u52A1\u5546\uFF0C\u670D\u52A1\u5546\u7528\u5370\u540E\u4F1A\u63D0\u4EA4\u5E73\u53F0\u5BA1\u6838\u3002"],
        auditing: ["\u5E73\u53F0\u5BA1\u6838\u4E2D", "\u53CC\u65B9\u7528\u5370\u534F\u8BAE\u5DF2\u63D0\u4EA4\u5E73\u53F0\uFF0C\u5BA1\u6838\u901A\u8FC7\u540E\u670D\u52A1\u56E2\u961F\u5F00\u59CB\u4EA4\u4ED8\u3002"],
        approved: ["\u534F\u8BAE\u5BA1\u6838\u901A\u8FC7", "\u53CC\u65B9\u534F\u8BAE\u5DF2\u5F52\u6863\uFF0C\u670D\u52A1\u56E2\u961F\u5DF2\u7ECF\u5F00\u59CB\u4EA4\u4ED8\u3002"]
      }[agreement.status];
      let body = '<div class="p7-agreement-detail"><div class="p7-agreement-state"><span>' + icon("shield", 22) + "</span><div><strong>" + stateCopy[0] + "</strong><p>" + stateCopy[1] + "</p></div></div><dl><div><dt>\u534F\u8BAE\u540D\u79F0</dt><dd>" + escapeHTML(agreement.title) + "</dd></div><div><dt>\u5BA2\u6237</dt><dd>" + escapeHTML(agreement.customer) + "</dd></div><div><dt>\u670D\u52A1\u65B9</dt><dd>" + escapeHTML(agreement.provider) + "</dd></div><div><dt>\u670D\u52A1\u9879\u76EE</dt><dd>" + escapeHTML(agreement.service) + "</dd></div><div><dt>\u534F\u8BAE\u91D1\u989D</dt><dd>" + escapeHTML(agreement.amount) + '</dd></div></dl><button class="p7-template-file" id="p7AgreementTemplate" type="button">' + icon("file-text", 17) + "<span><strong>" + escapeHTML(agreement.template) + "</strong><small>\u670D\u52A1\u5546\u63D0\u4F9B\u7684\u6807\u51C6\u534F\u8BAE\u6A21\u677F</small></span>\u67E5\u770B</button>";
      if (agreement.providerFile) body += '<button class="p7-template-file p7-returned-agreement" id="p7ReturnedAgreement" type="button">' + icon("check-circle", 17) + "<span><strong>" + escapeHTML(agreement.providerFile) + "</strong><small>\u53CC\u65B9\u5DF2\u7528\u5370 \xB7 \u670D\u52A1\u5546\u4E8E " + escapeHTML(agreement.providerUploadedAt || "\u521A\u521A") + " \u56DE\u4F20</small></span>\u67E5\u770B</button>";
      if (agreement.status === "customer_action") body += '<label class="p7-agreement-upload">' + icon("file-text", 18) + '<span id="p7AgreementUploadName">\u9009\u62E9\u5DF2\u7528\u5370\u7684\u534F\u8BAE\u626B\u63CF\u4EF6</span><input id="p7AgreementInput" type="file" accept=".pdf,.jpg,.jpeg,.png"></label><button class="btn btn-primary btn-block" id="p7AgreementSubmit" type="button">\u4E0A\u4F20\u5E76\u63D0\u4EA4\u7ED9\u670D\u52A1\u5546</button>';
      else body += '<div class="p7-agreement-progress"><span class="done">\u5BA2\u6237\u8865\u5145\u4FE1\u606F\u5E76\u7528\u5370</span><span class="' + (["provider_signing", "auditing", "approved"].includes(agreement.status) ? "done" : "") + '">\u670D\u52A1\u5546\u7528\u5370</span><span class="' + (["auditing", "approved"].includes(agreement.status) ? "done" : "") + '">\u5E73\u53F0\u5BA1\u6838</span><span class="' + (agreement.status === "approved" ? "done" : "") + '">\u5F00\u59CB\u4EA4\u4ED8</span></div>';
      body += "</div>";
      const overlay = showSheet({ title: "\u670D\u52A1\u534F\u8BAE", body });
      overlay.querySelector("#p7AgreementTemplate").addEventListener("click", () => toast("\u5DF2\u6253\u5F00\u534F\u8BAE\u6A21\u677F\u9884\u89C8"));
      const returnedAgreement = overlay.querySelector("#p7ReturnedAgreement");
      if (returnedAgreement) returnedAgreement.addEventListener("click", () => toast("\u5DF2\u6253\u5F00\u53CC\u65B9\u7528\u5370\u534F\u8BAE"));
      const input = overlay.querySelector("#p7AgreementInput");
      if (input) input.addEventListener("change", function() {
        overlay.querySelector("#p7AgreementUploadName").textContent = this.files.length ? this.files[0].name : "\u9009\u62E9\u5DF2\u7528\u5370\u7684\u534F\u8BAE\u626B\u63CF\u4EF6";
      });
      const submit = overlay.querySelector("#p7AgreementSubmit");
      if (submit) submit.addEventListener("click", () => {
        if (!input.files.length) {
          toast("\u8BF7\u5148\u9009\u62E9\u5DF2\u7528\u5370\u7684\u534F\u8BAE\u6587\u4EF6");
          return;
        }
        changed2(uploadCustomerAgreement(demand, input.files[0].name, domainOptions5()));
        closeAllModals();
        this.refreshPage();
        toast("\u534F\u8BAE\u5DF2\u4E0A\u4F20\uFF0C\u7B49\u5F85\u670D\u52A1\u5546\u7528\u5370");
        this.simulateAgreementProgress(demand.id);
      });
    },
    simulateAgreementProgress(demandId) {
      setTimeout(() => {
        const demand = getDemand(demandId, store.demands);
        if (!demand || demand.agreement?.status !== "provider_signing") return;
        changed2(setAgreementStatus(demand, "auditing", domainOptions5()));
        const visible = document.getElementById("page-container")?.getAttribute("data-page") === "p7" && this.state.demand?.id === demandId;
        if (visible) {
          this.refreshPage();
          const overlay = showSheet({
            title: "\u670D\u52A1\u5546\u5DF2\u5B8C\u6210\u7528\u5370",
            body: '<div class="p7-agreement-returned"><span>' + icon("check-circle", 28) + '</span><strong>\u53CC\u65B9\u7528\u5370\u534F\u8BAE\u5DF2\u8FD4\u56DE</strong><p>\u670D\u52A1\u5546\u5DF2\u5B8C\u6210\u7528\u5370\u5E76\u4E0A\u4F20\u534F\u8BAE\uFF0C\u5E73\u53F0\u6B63\u5728\u6838\u5BF9\u7B7E\u7EA6\u4E3B\u4F53\u3001\u91D1\u989D\u548C\u670D\u52A1\u8303\u56F4\u3002</p><button class="p7-template-file" id="p7ReturnedPreview" type="button">' + icon("file-text", 17) + "<span><strong>" + escapeHTML(demand.agreement.providerFile) + '</strong><small>\u53CC\u65B9\u5DF2\u7528\u5370 \xB7 \u5E73\u53F0\u5BA1\u6838\u4E2D</small></span>\u67E5\u770B</button><button class="btn btn-primary btn-block" id="p7ReturnedDone" type="button">\u77E5\u9053\u4E86</button></div>'
          });
          overlay.querySelector("#p7ReturnedPreview").addEventListener("click", () => toast("\u5DF2\u6253\u5F00\u53CC\u65B9\u7528\u5370\u534F\u8BAE"));
          overlay.querySelector("#p7ReturnedDone").addEventListener("click", () => overlay.remove());
        }
        setTimeout(() => {
          const current = getDemand(demandId, store.demands);
          if (!current || current.agreement?.status !== "auditing") return;
          changed2(setAgreementStatus(current, "approved", domainOptions5()));
          const stillVisible = document.getElementById("page-container")?.getAttribute("data-page") === "p7" && this.state.demand?.id === demandId;
          if (!stillVisible) return;
          closeAllModals();
          this.refreshPage();
          const approved = showSheet({
            title: "\u534F\u8BAE\u5BA1\u6838\u901A\u8FC7",
            body: '<div class="p7-agreement-returned approved"><span>' + icon("shield", 28) + '</span><strong>\u53CC\u65B9\u534F\u8BAE\u5DF2\u5F52\u6863</strong><p>\u534F\u8BAE\u5DF2\u901A\u8FC7\u5E73\u53F0\u8981\u7D20\u5BA1\u6838\uFF0C\u670D\u52A1\u56E2\u961F\u53EF\u4EE5\u6309\u7EA6\u5F00\u59CB\u4EA4\u4ED8\u3002</p><button class="btn btn-primary btn-block" id="p7AgreementProgress" type="button">\u67E5\u770B\u670D\u52A1\u8FDB\u5EA6</button></div>'
          });
          approved.querySelector("#p7AgreementProgress").addEventListener("click", () => {
            approved.remove();
            navigateTo("p6", { demandId, tab: "progress" });
          });
        }, 2800);
      }, 1400);
    },
    openChangeOrderSheet() {
      const body = '<div class="p7-revision-sheet"><p>\u628A\u9700\u8981\u589E\u52A0\u7684\u670D\u52A1\u5185\u5BB9\u544A\u8BC9\u5E73\u53F0\u52A9\u624B\u3002\u670D\u52A1\u56E2\u961F\u8BC4\u4F30\u540E\uFF0C\u4F1A\u5728\u5C0F\u7A0B\u5E8F\u4E2D\u63A8\u9001\u589E\u9879\u5361\u7247\u3002</p><textarea id="p7ChangeNote" maxlength="200" placeholder="\u8BF4\u660E\u65B0\u589E\u9700\u6C42"></textarea><button class="btn btn-primary btn-block" id="p7SubmitChange">\u63D0\u4EA4\u7ED9\u5E73\u53F0\u52A9\u624B</button></div>';
      showSheet({ title: "\u7533\u8BF7\u670D\u52A1\u589E\u9879", body });
      document.getElementById("p7SubmitChange").addEventListener("click", () => {
        const note = document.getElementById("p7ChangeNote").value.trim();
        if (!note) {
          toast("\u8BF7\u586B\u5199\u65B0\u589E\u9700\u6C42");
          return;
        }
        changed2(createChangeOrder(this.state.demand, note, domainOptions5()));
        closeAllModals();
        this.refreshPage();
        toast("\u56E2\u961F\u5DF2\u63A8\u9001\u589E\u9879\u65B9\u6848");
      });
    },
    confirmChangeOrder(orderId) {
      const demand = this.state.demand;
      showModal({
        title: "\u786E\u8BA4\u8FD9\u9879\u670D\u52A1\u589E\u9879\uFF1F",
        body: "\u786E\u8BA4\u540E\uFF0C\u65B0\u589E\u8D39\u7528\u548C\u5DE5\u671F\u4F1A\u8BA1\u5165\u5F53\u524D\u670D\u52A1\u65B9\u6848\u3002",
        cancelText: "\u7A0D\u540E\u786E\u8BA4",
        confirmText: "\u786E\u8BA4\u589E\u9879",
        onConfirm: () => {
          changed2(confirmChangeOrder(demand, orderId, domainOptions5()));
          this.refreshPage();
          toast("\u670D\u52A1\u589E\u9879\u5DF2\u786E\u8BA4");
        }
      });
    },
    refreshPage() {
      const demand = this.state.demand;
      const team = this.state.team;
      const params = { demandId: demand.id, teamId: team.id };
      renderPageContent3(this.render(params), "p7");
      this.init(params);
    }
  };
  register("p7", page7);

  // src/pages/p8-review/DimensionStars.js
  function renderDimensionStars(dimensionKeys, storedDimensions, readonly) {
    let html = '<div class="p8-dimension-list">';
    dimensionKeys.forEach((dimensionKey) => {
      const dimensionValue = Number(storedDimensions[dimensionKey] || 0);
      html += '<div class="p8-dimension-row"><span class="p8-dimension-label">' + reviewDimensionLabels[dimensionKey] + "</span>";
      html += '<div class="star-input p8-dimension-stars" data-dimension="' + dimensionKey + '">';
      for (let star = 1; star <= 5; star += 1) {
        const active = dimensionValue >= star ? " active" : "";
        html += '<span class="' + active + '" data-star="' + star + '">' + icon("star", readonly ? 28 : 32) + "</span>";
      }
      html += '</div><span class="p8-dimension-score">' + (dimensionValue ? dimensionValue.toFixed(1) : "\u2014") + "</span></div>";
    });
    html += "</div>";
    return html;
  }
  function bindDimensionStars(page14) {
    document.querySelectorAll(".p8-dimension-stars").forEach((group) => {
      const key = group.getAttribute("data-dimension");
      const starSpans = group.querySelectorAll("[data-star]");
      starSpans.forEach((span) => {
        span.addEventListener("click", function() {
          const star = parseInt(this.getAttribute("data-star"), 10);
          page14.state.ratings[key] = star;
          starSpans.forEach((item) => {
            item.classList.toggle("active", parseInt(item.getAttribute("data-star"), 10) <= star);
          });
          group.parentNode.querySelector(".p8-dimension-score").textContent = star.toFixed(1);
          const overall = page14.getOverallRating(page14.state.ratings);
          const complete = Object.keys(page14.state.ratings).length === page14.dimensionKeys.length;
          document.getElementById("p8OverallScore").textContent = complete ? overall.toFixed(1) : "\u2014";
          document.getElementById("p8OverallLabel").textContent = complete ? page14.getRatingLabel(overall) : "\u5F85\u8BC4\u5206";
          document.getElementById("p8LowRatingHelp").classList.toggle("visible", complete && overall <= 2);
          const submitButton = document.getElementById("p8-submit");
          if (submitButton) submitButton.disabled = !complete;
        });
      });
    });
  }

  // src/pages/p8-review/TagPicker.js
  var QUICK_TAGS = ["\u4E13\u4E1A\u53EF\u9760", "\u54CD\u5E94\u53CA\u65F6", "\u6C9F\u901A\u6E05\u695A", "\u4EA4\u4ED8\u89C4\u8303", "\u503C\u5F97\u63A8\u8350"];
  function renderTagPicker(demand, readonly) {
    if (readonly && demand.reviewTags && demand.reviewTags.length) {
      return '<div class="p8-review-tags">' + demand.reviewTags.map((tag) => "<span>" + tag + "</span>").join("") + "</div>";
    }
    if (readonly) return "";
    return '<div class="p8-review-tags" id="p8ReviewTags">' + QUICK_TAGS.map((tag) => '<button type="button" data-review-tag="' + tag + '">' + tag + "</button>").join("") + '</div><label class="p8-anonymous"><input id="p8Anonymous" type="checkbox" checked><span>' + icon("shield", 16) + "</span><strong>\u533F\u540D\u8BC4\u4EF7</strong><small>\u9ED8\u8BA4\u9690\u85CF\u4F01\u4E1A\u540D\u79F0</small></label>";
  }
  function bindTagPicker(page14) {
    document.querySelectorAll("[data-review-tag]").forEach((button) => {
      button.addEventListener("click", function() {
        const tag = this.getAttribute("data-review-tag");
        const index = page14.state.tags.indexOf(tag);
        if (index >= 0) page14.state.tags.splice(index, 1);
        else page14.state.tags.push(tag);
        this.classList.toggle("active", index < 0);
      });
    });
    const anonymous = document.getElementById("p8Anonymous");
    if (anonymous) {
      anonymous.addEventListener("change", function() {
        page14.state.anonymous = this.checked;
      });
    }
  }

  // src/pages/p8-review/index.js
  var page8 = {
    state: { ratings: {}, text: "", demand: null, team: null, readonly: false, anonymous: true, tags: [] },
    dimensionKeys: ["professional", "response", "communication", "delivery"],
    getOverallRating(ratings) {
      const values = this.dimensionKeys.map((key) => Number(ratings[key] || 0)).filter((value) => value > 0);
      if (!values.length) return 0;
      return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length * 10) / 10;
    },
    getRatingLabel(score) {
      const rounded = Math.round(Number(score || 0));
      return { 5: "\u975E\u5E38\u6EE1\u610F", 4: "\u6EE1\u610F", 3: "\u4E00\u822C", 2: "\u4E0D\u6EE1\u610F", 1: "\u975E\u5E38\u4E0D\u6EE1\u610F" }[rounded] || "\u5F85\u8BC4\u5206";
    },
    getChosenResponse(demand) {
      if (!demand || !demand.chosenTeam || !demand.accepted) return null;
      return demand.accepted.find((item) => item.teamId === demand.chosenTeam) || null;
    },
    render(params) {
      const demand = getDemand(params.demandId, store.demands);
      if (!demand) {
        return '<div class="empty-state"><div class="empty-icon">' + icon("x-circle", 48) + '</div><div class="empty-title">\u9700\u6C42\u4E0D\u5B58\u5728</div></div>';
      }
      const team = getTeam(demand.chosenTeam, store.teams);
      const hasReview = demand.hasReview === true;
      const readonly = params.readonly === true || hasReview;
      this.state.demand = demand;
      this.state.team = team;
      this.state.ratings = {};
      this.state.text = "";
      this.state.readonly = readonly;
      this.state.anonymous = demand.reviewAnonymous !== false;
      this.state.tags = (demand.reviewTags || []).slice();
      let html = '<div style="display:flex;flex-direction:column;height:100%;position:relative">';
      html += '<div class="nav-bar">';
      html += '<button class="nav-back" id="p8Back">' + icon("chevron-left", 22) + "</button>";
      html += '<div class="nav-title">' + (hasReview ? "\u6211\u7684\u8BC4\u4EF7" : "\u8BC4\u4EF7\u670D\u52A1") + "</div>";
      html += '<div style="min-width:32px"></div></div>';
      if (demand.status !== "done") {
        html += '<div class="empty-state" style="padding:60px var(--space-4)">';
        html += '<div class="empty-icon">' + icon("lock", 48) + "</div>";
        html += '<div class="empty-title">\u670D\u52A1\u5B8C\u6210\u540E\u624D\u80FD\u8BC4\u4EF7</div>';
        html += '<div class="empty-desc">\u5F53\u524D\u9700\u6C42\u72B6\u6001\uFF1A' + getDemandStatusText(demand) + "<br>\u670D\u52A1\u5B8C\u6210\u540E\u8BC4\u4EF7\u5165\u53E3\u4F1A\u81EA\u52A8\u51FA\u73B0</div>";
        html += '<div style="margin-top:var(--space-4)"><button class="btn btn-outline" id="p8Return">\u8FD4\u56DE\u9700\u6C42</button></div>';
        html += "</div></div>";
        return html;
      }
      html += '<div style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch">';
      const response = this.getChosenResponse(demand);
      html += '<div class="p8-demand-summary">';
      html += '<div style="font-size:var(--font-md);font-weight:600;color:var(--color-text-1)">' + demand.title + "</div>";
      html += '<div style="font-size:var(--font-sm);color:var(--color-text-2);margin-top:var(--space-1)">' + (team ? team.name : "\u670D\u52A1\u56E2\u961F") + " \xB7 " + demand.categoryName + " \xB7 " + demand.sku + "</div>";
      html += '<div class="p8-summary-rows">';
      html += '<div class="p8-summary-row"><span>\u53D1\u8D77\u65E5\u671F</span><span>' + demand.date + "</span></div>";
      if (demand.completedDate) html += '<div class="p8-summary-row"><span>\u5B8C\u6210\u65E5\u671F</span><span>' + demand.completedDate + "</span></div>";
      const finalQuote = demand.servicePlan && demand.servicePlan.finalQuote ? demand.servicePlan.finalQuote : response && response.quote;
      if (finalQuote) html += '<div class="p8-summary-row"><span>\u6700\u7EC8\u62A5\u4EF7</span><span>' + finalQuote + "</span></div>";
      html += '<div class="p8-summary-row"><span>\u9884\u7B97\u8303\u56F4</span><span>' + demand.budget + "</span></div>";
      html += '</div><div class="p8-eligibility">\u4EC5\u5728\u5E73\u53F0\u5185\u5B8C\u6210\u670D\u52A1\u7684\u5BA2\u6237\u53EF\u8BC4\u4EF7</div></div>';
      html += '<div class="p8-rating-section">';
      const initialOverall = readonly && demand.reviewRating ? demand.reviewRating.toFixed ? demand.reviewRating.toFixed(1) : demand.reviewRating : "\u2014";
      html += '<div class="p8-rating-head"><div><div class="p8-rating-label">\u670D\u52A1\u8868\u73B0\u8BC4\u5206</div><div class="p8-rating-help">\u8BF7\u6309\u5B9E\u9645\u4F53\u9A8C\u8BC4\u4EF7\u56DB\u9879\u8868\u73B0</div></div><div class="p8-overall"><span>\u7EFC\u5408\u8BC4\u5206</span><strong id="p8OverallScore">' + initialOverall + '</strong><small id="p8OverallLabel">' + (readonly && demand.reviewRating ? this.getRatingLabel(demand.reviewRating) : "\u5F85\u8BC4\u5206") + "</small></div></div>";
      const storedDimensions = demand.reviewDimensions || {};
      if (readonly && demand.reviewRating && !Object.keys(storedDimensions).length) {
        this.dimensionKeys.forEach((key) => {
          storedDimensions[key] = demand.reviewRating;
        });
      }
      html += renderDimensionStars(this.dimensionKeys, storedDimensions, readonly);
      html += '<div class="p8-rating-scale"><span>5 \u975E\u5E38\u6EE1\u610F</span><span>4 \u6EE1\u610F</span><span>3 \u4E00\u822C</span><span>2 \u4E0D\u6EE1\u610F</span><span>1 \u975E\u5E38\u4E0D\u6EE1\u610F</span></div>';
      html += '<button class="p8-low-rating-help" id="p8LowRatingHelp" type="button">\u5BF9\u670D\u52A1\u4E0D\u6EE1\u610F\uFF1F\u53EF\u7533\u8BF7\u5E73\u53F0\u534F\u52A9\u5904\u7406 ' + icon("chevron-right", 14) + "</button>";
      if (readonly) {
        if (!demand.reviewRating) {
          html += '<div style="font-size:var(--font-sm);color:var(--color-text-3);padding:var(--space-2) 0">\u8FD9\u6761\u9700\u6C42\u8FD8\u6CA1\u6709\u8BC4\u5206\u8BB0\u5F55</div>';
        } else {
          html += '<div class="p8-review-meta"><span class="tag tag-neutral">\u5DF2\u8BC4\u4EF7</span>';
          if (demand.reviewDate) html += '<span style="font-size:var(--font-xs);color:var(--color-text-3);margin-left:8px">' + demand.reviewDate + "</span>";
          html += "</div>";
        }
      } else {
        html += '<div class="p8-required-note">\u56DB\u9879\u5747\u4E3A\u5FC5\u586B</div>';
      }
      html += "</div>";
      html += '<div class="p8-text-section"><div class="p8-text-label">\u8BE6\u7EC6\u8BC4\u4EF7 <span>\u9009\u586B</span></div>';
      if (readonly) {
        html += demand.reviewText ? '<div style="font-size:var(--font-sm);color:var(--color-text-2);line-height:var(--lh-relaxed);padding:var(--space-2) 0">' + demand.reviewText + "</div>" : '<div style="font-size:var(--font-sm);color:var(--color-text-3);padding:var(--space-2) 0">\u8FD9\u6761\u9700\u6C42\u6CA1\u6709\u7559\u4E0B\u6587\u5B57\u8BC4\u4EF7\u3002</div>';
      } else {
        html += '<textarea class="textarea" id="p8-textarea" placeholder="\u8BF4\u8BF4\u54CD\u5E94\u901F\u5EA6\u3001\u4E13\u4E1A\u6C34\u5E73\u548C\u4EA4\u4ED8\u8D28\u91CF\uFF0C\u5E2E\u52A9\u5176\u4ED6\u4F01\u4E1A\u4E86\u89E3\u8FD9\u652F\u56E2\u961F\u3002" maxlength="500" style="min-height:100px"></textarea>';
        html += '<div style="text-align:right;font-size:var(--font-xs);color:var(--color-text-3);margin-top:var(--space-1)"><span id="p8-char-count">0</span>/500</div>';
      }
      html += renderTagPicker(demand, readonly);
      html += "</div></div>";
      if (!readonly) {
        html += '<div class="bottom-bar" style="position:relative;flex-shrink:0"><button class="btn btn-primary btn-block" id="p8-submit" disabled>\u63D0\u4EA4\u8BC4\u4EF7</button></div>';
      }
      html += "</div>";
      return html;
    },
    init() {
      const demand = this.state.demand;
      if (!demand) return;
      showTabBar(false);
      const backButton = document.getElementById("p8Back");
      if (backButton) backButton.addEventListener("click", goBackToPrevious);
      const returnButton = document.getElementById("p8Return");
      if (returnButton) returnButton.addEventListener("click", goBackToPrevious);
      if (demand.status !== "done" || this.state.readonly) return;
      bindDimensionStars(this);
      const textarea = document.getElementById("p8-textarea");
      const charCount = document.getElementById("p8-char-count");
      if (textarea && charCount) {
        textarea.addEventListener("input", () => {
          this.state.text = textarea.value;
          charCount.textContent = textarea.value.length;
        });
      }
      bindTagPicker(this);
      const lowRatingHelp = document.getElementById("p8LowRatingHelp");
      if (lowRatingHelp) {
        lowRatingHelp.addEventListener("click", () => {
          const body = '<div class="p8-support-sheet"><p>\u8BF7\u4FDD\u7559\u670D\u52A1\u65B9\u6848\u3001\u6C9F\u901A\u8BB0\u5F55\u548C\u4EA4\u4ED8\u6587\u4EF6\u3002\u63D0\u4EA4\u540E\u5E73\u53F0\u4F1A\u534F\u52A9\u6838\u5BF9\u53CC\u65B9\u7EA6\u5B9A\u3002</p><button class="btn btn-primary btn-block" id="p8SupportSubmit">\u63D0\u4EA4\u534F\u52A9\u7533\u8BF7</button></div>';
          showSheet({ title: "\u7533\u8BF7\u5E73\u53F0\u534F\u52A9", body });
          document.getElementById("p8SupportSubmit").addEventListener("click", () => {
            closeAllModals();
            toast("\u534F\u52A9\u7533\u8BF7\u5DF2\u63D0\u4EA4");
          });
        });
      }
      const submitButton = document.getElementById("p8-submit");
      if (submitButton) {
        submitButton.addEventListener("click", () => {
          const missing = this.dimensionKeys.filter((key) => !this.state.ratings[key]);
          if (missing.length) {
            toast("\u8BF7\u5B8C\u6210\u56DB\u9879\u670D\u52A1\u8868\u73B0\u8BC4\u5206");
            return;
          }
          const safeText = filterContact(this.state.text.trim());
          showModal({
            title: "\u786E\u8BA4\u63D0\u4EA4\u8BC4\u4EF7\uFF1F",
            body: "\u8BC4\u4EF7\u63D0\u4EA4\u540E\u4F1A\u7ACB\u5373\u5C55\u793A\uFF0C\u63D0\u4EA4\u540E\u4E0D\u53EF\u4FEE\u6539\u3002",
            confirmText: "\u786E\u8BA4\u63D0\u4EA4",
            onConfirm: () => {
              this.commitReview(demand, this.state.ratings, safeText, this.state.tags, this.state.anonymous);
              toast("\u8BC4\u4EF7\u5DF2\u53D1\u5E03");
              goBackToPrevious();
              refreshActivePage();
            }
          });
        });
      }
    },
    commitReview(demand, ratings, text, tags, anonymous) {
      const rating = this.getOverallRating(ratings);
      demand.hasReview = true;
      demand.reviewRating = rating;
      demand.reviewDimensions = { ...ratings };
      demand.reviewText = text;
      demand.reviewTags = (tags || []).slice();
      demand.reviewAnonymous = anonymous !== false;
      demand.reviewDate = todayLabel();
      demand.progress = "\u5DF2\u5B8C\u6210\xB7\u5DF2\u8BC4\u4EF7";
      addTimelineEvent(demand, "review", "\u5DF2\u53D1\u5E03\u8BC4\u4EF7", rating + " \u5206");
      const team = getTeam(demand.chosenTeam, store.teams);
      if (team) {
        const oldCount = team.reviewCount || 0;
        const oldRating = team.rating || rating;
        const oldDimensions = { ...getTeamRatingDimensions(team) };
        const newCount = oldCount + 1;
        team.rating = Math.round((oldRating * oldCount + rating) / newCount * 10) / 10;
        team.reviewCount = newCount;
        const newDimensions = {};
        this.dimensionKeys.forEach((key) => {
          newDimensions[key] = Math.round((Number(oldDimensions[key] || oldRating) * oldCount + Number(ratings[key])) / newCount * 10) / 10;
        });
        team.ratingDimensions = newDimensions;
        if (!team.reviews) team.reviews = [];
        team.reviews.unshift({
          user: anonymous === false ? user.company : user.name.charAt(0) + "***",
          rating,
          dimensions: { ...ratings },
          text: text || "\u7528\u6237\u672A\u586B\u5199\u6587\u5B57\u8BC4\u4EF7",
          tags: (tags || []).slice(),
          date: demand.reviewDate
        });
      }
      emitChange();
      updateBadge();
    }
  };
  register("p8", page8);

  // src/components/demandCard.js
  function getDemandAction(demand) {
    if (demand.status === "pending") return { label: "\u67E5\u770B\u54CD\u5E94\u8FDB\u5EA6", action: "progress" };
    if (demand.status === "choosing") return { label: "\u9009\u62E9\u670D\u52A1\u56E2\u961F", action: "accepted" };
    if (demand.status === "communicating") return { label: "\u8865\u5145\u4FE1\u606F", action: "chat" };
    if (demand.status === "plan_pending") return { label: "\u786E\u8BA4\u670D\u52A1\u65B9\u6848", action: "chat" };
    if (demand.status === "contract_pending") return { label: "\u7B7E\u7F72\u670D\u52A1\u534F\u8BAE", action: "agreement" };
    if (demand.status === "active") return { label: "\u67E5\u770B\u670D\u52A1\u8FDB\u5EA6", action: "progress" };
    if (demand.status === "acceptance") return { label: "\u786E\u8BA4\u9A8C\u6536", action: "delivery" };
    if (demand.status === "done" && demand.hasReview) return { label: "\u67E5\u770B\u8BC4\u4EF7", action: "review-readonly" };
    if (demand.status === "done") return { label: "\u53BB\u8BC4\u4EF7", action: "review" };
    if (demand.status === "cancelled") return { label: "\u91CD\u65B0\u53D1\u5E03", action: "resubmit" };
    return { label: "\u67E5\u770B\u8BE6\u60C5", action: "detail" };
  }
  function renderDemandCard(demand) {
    const action = getDemandAction(demand);
    const statusText = demand.status === "cancelled" && String(demand.progress || "").indexOf("\u5DF2\u7ED3\u675F") === 0 ? "\u672C\u8F6E\u5DF2\u7ED3\u675F" : getDemandStatusText(demand);
    const accepted = (demand.accepted || []).length;
    const waiting = (demand.pending || []).length;
    const rejected = (demand.rejected || []).length;
    const timedOut = (demand.timedOut || []).length;
    const summary = [];
    if (accepted) summary.push("\u5DF2\u54CD\u5E94 " + accepted);
    if (waiting) summary.push("\u7B49\u5F85\u4E2D " + waiting);
    if (rejected) summary.push("\u672A\u627F\u63A5 " + rejected);
    if (timedOut) summary.push("\u672A\u54CD\u5E94 " + timedOut);
    let html = '<article class="p9-demand-card" data-demand-id="' + demand.id + '">';
    html += '<div class="p9-card-header"><div class="p9-card-title">' + demand.title + '</div><span class="p9-card-status">' + statusText + "</span></div>";
    if (demand.status !== "done") html += '<div class="p9-card-progress">' + (demand.progress || "") + "</div>";
    html += '<div class="p9-card-meta">' + demand.categoryName + " \xB7 " + demand.sku + "<span>" + demand.date + "</span></div>";
    if (summary.length) html += '<div class="p9-card-resp">' + summary.join(" \xB7 ") + "</div>";
    const primaryActions = ["review", "accepted", "chat", "agreement", "delivery"];
    html += '<div class="p9-card-action"><button class="btn btn-sm ' + (primaryActions.includes(action.action) ? "btn-primary" : "btn-outline") + '" data-p9-action="' + action.action + '" data-demand-id="' + demand.id + '">' + action.label + "</button></div>";
    html += "</article>";
    return html;
  }

  // src/pages/p9-mylist/index.js
  var EMPTY_DESCRIPTIONS = {
    all: "\u8FD8\u6CA1\u6709\u53D1\u5E03\u8FC7\u670D\u52A1\u9700\u6C42",
    pending: "\u6CA1\u6709\u7B49\u5F85\u56E2\u961F\u54CD\u5E94\u7684\u9700\u6C42",
    decision: "\u6CA1\u6709\u9700\u8981\u786E\u8BA4\u7684\u65B9\u6848\u6216\u56E2\u961F",
    service: "\u6CA1\u6709\u6B63\u5728\u8FDB\u884C\u7684\u670D\u52A1",
    ended: "\u8FD8\u6CA1\u6709\u5DF2\u7ED3\u675F\u7684\u670D\u52A1\u9700\u6C42"
  };
  function byPriorityThenDate(left, right) {
    const priorityDifference = (PRIORITY[left.status] || 99) - (PRIORITY[right.status] || 99);
    if (priorityDifference) return priorityDifference;
    if (left.date === right.date) return 0;
    return left.date < right.date ? 1 : -1;
  }
  var page9 = {
    state: { activeFilter: "all" },
    statusFilters: STATUS_FILTERS,
    statusTextMap: STATUS_TEXT,
    emptyDescMap: EMPTY_DESCRIPTIONS,
    getFilteredDemands(filter) {
      let filtered;
      if (filter === "all") filtered = store.demands;
      else if (filter === "decision") filtered = store.demands.filter((demand) => ["choosing", "communicating", "plan_pending", "contract_pending", "acceptance"].includes(demand.status));
      else if (filter === "service") filtered = store.demands.filter((demand) => demand.status === "active");
      else if (filter === "ended") filtered = store.demands.filter((demand) => ["done", "cancelled"].includes(demand.status));
      else filtered = store.demands.filter((demand) => demand.status === filter);
      return filtered.slice().sort(byPriorityThenDate);
    },
    needsAttention(demand) {
      return ["choosing", "communicating", "plan_pending", "contract_pending", "acceptance"].includes(demand.status) || demand.status === "done" && !demand.hasReview;
    },
    getActionForStatus(demand) {
      return getDemandAction(demand);
    },
    renderDemandCard,
    renderList(filter) {
      const demands2 = this.getFilteredDemands(filter);
      if (!demands2.length) {
        return '<div class="empty-state p9-empty"><div class="empty-icon">' + icon("inbox", 48) + '</div><div class="empty-title">\u6682\u65E0\u9700\u6C42</div><div class="empty-desc">' + this.emptyDescMap[filter] + '</div><button class="btn btn-primary" data-p9-action="new-demand">\u53D1\u5E03\u9700\u6C42</button></div>';
      }
      if (filter !== "all") return demands2.map(renderDemandCard).join("");
      const attention = demands2.filter((demand) => this.needsAttention(demand));
      const other = demands2.filter((demand) => !this.needsAttention(demand));
      let html = "";
      if (attention.length) {
        html += '<section class="p9-priority"><div class="p9-list-heading"><strong>\u9700\u8981\u6211\u5904\u7406</strong><span>' + attention.length + " \u9879</span></div>" + attention.map(renderDemandCard).join("") + "</section>";
      }
      if (other.length) {
        html += '<section><div class="p9-list-heading"><strong>' + (attention.length ? "\u5176\u4ED6\u9700\u6C42" : "\u5168\u90E8\u9700\u6C42") + "</strong><span>" + other.length + " \u6761</span></div>" + other.map(renderDemandCard).join("") + "</section>";
      }
      return html;
    },
    onRefresh() {
      this.state.keepFilter = this.state.activeFilter;
    },
    render(params) {
      const initialFilter = params.filter || this.state.keepFilter || "all";
      this.state.keepFilter = null;
      this.state.activeFilter = initialFilter;
      let html = '<div class="p9-page"><div class="nav-bar"><button class="nav-back" id="p9Back">' + icon("chevron-left", 22) + '</button><div class="nav-title">\u6211\u7684\u670D\u52A1\u9700\u6C42</div><div style="min-width:32px"></div></div>';
      if (!isWecomAdded()) {
        html += '<button class="p9-wecom-entry" id="p9WecomEntry" type="button"><span class="p9-wecom-icon">' + icon("bell", 18) + "</span><span><strong>\u6DFB\u52A0\u4F01\u4E1A\u5FAE\u4FE1</strong><small>\u53CA\u65F6\u63A5\u6536\u56E2\u961F\u54CD\u5E94\u548C\u670D\u52A1\u8FDB\u5EA6\u901A\u77E5</small></span>" + icon("chevron-right", 17) + "</button>";
      }
      html += '<div class="p9-status-tabs">';
      this.statusFilters.forEach((filter) => {
        html += '<button class="p9-status-tab' + (filter.key === initialFilter ? " active" : "") + '" data-p9-filter="' + filter.key + '">' + filter.label + "</button>";
      });
      html += '</div><div id="p9-list" class="p9-list">' + this.renderList(initialFilter) + "</div></div>";
      return html;
    },
    init() {
      showTabBar(false);
      const backButton = document.getElementById("p9Back");
      if (backButton) backButton.addEventListener("click", goBackToPrevious);
      const wecomEntry = document.getElementById("p9WecomEntry");
      if (wecomEntry) wecomEntry.addEventListener("click", () => openWecomGuide());
      document.querySelectorAll("[data-p9-filter]").forEach((tab) => {
        tab.addEventListener("click", () => {
          this.state.activeFilter = tab.getAttribute("data-p9-filter");
          document.querySelectorAll("[data-p9-filter]").forEach((item) => item.classList.remove("active"));
          tab.classList.add("active");
          document.getElementById("p9-list").innerHTML = this.renderList(this.state.activeFilter);
          this.bindListHandlers();
        });
      });
      this.bindListHandlers();
    },
    openAction(action, demand) {
      if (action === "new-demand") {
        navigateTo("p5");
        return;
      }
      if (action === "resubmit") {
        navigateTo("p5", { demandId: demand.id });
        return;
      }
      if (action === "review") {
        navigateTo("p8", { demandId: demand.id });
        return;
      }
      if (action === "review-readonly") {
        navigateTo("p8", { demandId: demand.id, readonly: true });
        return;
      }
      if (action === "chat") {
        navigateTo("p7", { demandId: demand.id, teamId: demand.candidateTeam || (demand.accepted[0] || {}).teamId });
        return;
      }
      if (action === "agreement") {
        navigateTo("p7", { demandId: demand.id, teamId: demand.chosenTeam, open: "agreement" });
        return;
      }
      const tab = action === "accepted" ? "accepted" : action === "delivery" ? "delivery" : action === "progress" ? "progress" : "content";
      navigateTo("p6", { demandId: demand.id, tab });
    },
    bindListHandlers() {
      document.querySelectorAll(".p9-demand-card").forEach((card) => {
        card.addEventListener("click", (event) => {
          if (event.target.closest("[data-p9-action]")) return;
          navigateTo("p6", { demandId: card.getAttribute("data-demand-id") });
        });
      });
      document.querySelectorAll("[data-p9-action]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          const action = button.getAttribute("data-p9-action");
          const demand = getDemand(button.getAttribute("data-demand-id"), store.demands);
          if (action === "new-demand") {
            navigateTo("p5");
            return;
          }
          this.openAction(action, demand);
        });
      });
    }
  };
  register("p9", page9);

  // src/data/serviceBlueprints.js
  var serviceBlueprints = {
    "\u80A1\u6743\u67B6\u6784\u8BBE\u8BA1": {
      intro: "\u7ED3\u5408\u521B\u59CB\u56E2\u961F\u5206\u5DE5\u3001\u63A7\u5236\u6743\u5B89\u6392\u548C\u540E\u7EED\u878D\u8D44\u8BA1\u5212\uFF0C\u5F62\u6210\u53EF\u6267\u884C\u7684\u80A1\u6743\u7ED3\u6784\u65B9\u6848\u3002",
      suitableFor: "\u9002\u5408\u6B63\u5728\u7EC4\u5EFA\u6838\u5FC3\u56E2\u961F\u3001\u51C6\u5907\u878D\u8D44\u6216\u9700\u8981\u8C03\u6574\u73B0\u6709\u80A1\u6743\u7ED3\u6784\u7684\u4F01\u4E1A\u3002",
      scope: ["\u68B3\u7406\u521B\u59CB\u4EBA\u4E0E\u6838\u5FC3\u6210\u5458\u7684\u8D21\u732E\u548C\u8BC9\u6C42", "\u8BBE\u8BA1\u6301\u80A1\u7ED3\u6784\u3001\u63A7\u5236\u6743\u4E0E\u51B3\u7B56\u673A\u5236", "\u8BC4\u4F30\u540E\u7EED\u878D\u8D44\u53CA\u5458\u5DE5\u6FC0\u52B1\u7684\u9884\u7559\u7A7A\u95F4", "\u5C31\u65B9\u6848\u843D\u5730\u8DEF\u5F84\u63D0\u4F9B\u6CD5\u5F8B\u5EFA\u8BAE"],
      deliverables: ["\u80A1\u6743\u67B6\u6784\u65B9\u6848\u8BF4\u660E", "\u80A1\u6743\u6BD4\u4F8B\u4E0E\u63A7\u5236\u6743\u5EFA\u8BAE", "\u914D\u5957\u534F\u8BAE\u6216\u6761\u6B3E\u6E05\u5355", "\u65B9\u6848\u6C9F\u901A\u4E0E\u4E00\u8F6E\u8C03\u6574"],
      process: ["\u63D0\u4EA4\u73B0\u6709\u60C5\u51B5", "\u987E\u95EE\u8BBF\u8C08", "\u5F62\u6210\u521D\u6B65\u65B9\u6848", "\u786E\u8BA4\u5E76\u4EA4\u4ED8"],
      period: "\u901A\u5E38 2\u20143 \u5468",
      materials: ["\u516C\u53F8\u53CA\u80A1\u4E1C\u57FA\u672C\u4FE1\u606F", "\u73B0\u6709\u80A1\u6743\u7ED3\u6784", "\u5408\u4F19\u4EBA\u5206\u5DE5\u4E0E\u51FA\u8D44\u60C5\u51B5", "\u672A\u6765\u878D\u8D44\u6216\u6FC0\u52B1\u8BA1\u5212"],
      exclusions: ["\u5DE5\u5546\u53D8\u66F4\u4EE3\u529E", "\u7A0E\u52A1\u4E13\u9879\u610F\u89C1", "\u4E89\u8BAE\u89E3\u51B3\u6216\u8BC9\u8BBC\u670D\u52A1"]
    },
    "\u878D\u8D44\u4EA4\u6613": {
      intro: "\u56F4\u7ED5\u878D\u8D44\u7ED3\u6784\u3001\u5C3D\u804C\u8C03\u67E5\u548C\u4EA4\u6613\u6587\u4EF6\uFF0C\u4E3A\u4F01\u4E1A\u63D0\u4F9B\u4ECE\u8C08\u5224\u5230\u4EA4\u5272\u7684\u6CD5\u5F8B\u652F\u6301\u3002",
      suitableFor: "\u9002\u5408\u6B63\u5728\u63A5\u89E6\u6295\u8D44\u4EBA\u3001\u6536\u5230\u6295\u8D44\u610F\u5411\u6216\u51C6\u5907\u542F\u52A8\u65B0\u4E00\u8F6E\u878D\u8D44\u7684\u4F01\u4E1A\u3002",
      scope: ["\u4EA4\u6613\u7ED3\u6784\u4E0E\u5173\u952E\u6761\u6B3E\u5206\u6790", "\u914D\u5408\u6295\u8D44\u65B9\u5F00\u5C55\u6CD5\u5F8B\u5C3D\u8C03", "\u8D77\u8349\u6216\u5BA1\u9605\u6295\u8D44\u534F\u8BAE\u53CA\u914D\u5957\u6587\u4EF6", "\u53C2\u4E0E\u6838\u5FC3\u6761\u6B3E\u8C08\u5224\u4E0E\u4EA4\u5272"],
      deliverables: ["\u5C3D\u8C03\u6750\u6599\u6E05\u5355\u4E0E\u95EE\u9898\u53CD\u9988", "\u4EA4\u6613\u7ED3\u6784\u53CA\u98CE\u9669\u63D0\u793A", "\u6295\u8D44\u534F\u8BAE\u4E0E\u914D\u5957\u6587\u4EF6", "\u7B7E\u7F72\u53CA\u4EA4\u5272\u6587\u4EF6\u5305"],
      process: ["\u786E\u8BA4\u4EA4\u6613\u80CC\u666F", "\u5C3D\u8C03\u4E0E\u7ED3\u6784\u8BBE\u8BA1", "\u6587\u4EF6\u8C08\u5224\u4FEE\u6539", "\u7B7E\u7F72\u4EA4\u5272"],
      period: "\u901A\u5E38 4\u20148 \u5468",
      materials: ["\u73B0\u6709\u80A1\u6743\u7ED3\u6784\u8868", "\u516C\u53F8\u7AE0\u7A0B\u53CA\u5386\u53F2\u53D8\u66F4\u6587\u4EF6", "\u6295\u8D44\u610F\u5411\u4E66\u6216 TS \u8349\u7A3F", "\u6838\u5FC3\u4E1A\u52A1\u5408\u540C\u4E0E\u77E5\u8BC6\u4EA7\u6743\u8D44\u6599"],
      exclusions: ["\u4E13\u9879\u8D22\u7A0E\u5BA1\u8BA1", "\u5883\u5916\u6CD5\u5F8B\u610F\u89C1", "\u8D85\u51FA\u7EA6\u5B9A\u8F6E\u6B21\u7684\u6301\u7EED\u8C08\u5224"]
    },
    "\u5408\u540C\u5BA1\u67E5": {
      intro: "\u8BC6\u522B\u5408\u540C\u4E2D\u7684\u6743\u8D23\u5931\u8861\u3001\u5C65\u7EA6\u98CE\u9669\u548C\u4E89\u8BAE\u6761\u6B3E\uFF0C\u5E76\u7ED9\u51FA\u53EF\u76F4\u63A5\u6C9F\u901A\u7684\u4FEE\u6539\u5EFA\u8BAE\u3002",
      suitableFor: "\u9002\u5408\u9700\u8981\u7B7E\u7F72\u5BA2\u6237\u3001\u4F9B\u5E94\u5546\u3001\u5408\u4F5C\u6216\u6295\u8D44\u76F8\u5173\u5408\u540C\u7684\u4F01\u4E1A\u3002",
      scope: ["\u6838\u5BF9\u4EA4\u6613\u80CC\u666F\u4E0E\u6838\u5FC3\u8BC9\u6C42", "\u9010\u6761\u5BA1\u67E5\u6743\u5229\u4E49\u52A1\u548C\u8FDD\u7EA6\u8D23\u4EFB", "\u6807\u8BB0\u9AD8\u98CE\u9669\u6761\u6B3E\u5E76\u8BF4\u660E\u5F71\u54CD", "\u63D0\u4F9B\u4FEE\u6539\u7A3F\u6216\u8C08\u5224\u5EFA\u8BAE"],
      deliverables: ["\u5408\u540C\u98CE\u9669\u6E05\u5355", "\u5E26\u4FEE\u8BA2\u75D5\u8FF9\u7684\u5408\u540C\u7248\u672C", "\u91CD\u70B9\u6761\u6B3E\u6C9F\u901A\u5EFA\u8BAE", "\u4E00\u6B21\u4FEE\u6539\u590D\u6838"],
      process: ["\u63D0\u4EA4\u5408\u540C", "\u8865\u5145\u4EA4\u6613\u80CC\u666F", "\u5B8C\u6210\u5BA1\u67E5", "\u8BB2\u89E3\u4E0E\u590D\u6838"],
      period: "\u901A\u5E38 1\u20143 \u4E2A\u5DE5\u4F5C\u65E5",
      materials: ["\u5F85\u5BA1\u5408\u540C\u5B8C\u6574\u7248\u672C", "\u4EA4\u6613\u80CC\u666F\u548C\u5408\u4F5C\u65B9\u5F0F", "\u6700\u5173\u6CE8\u7684\u6761\u6B3E\u6216\u98CE\u9669"],
      exclusions: ["\u5408\u540C\u4EE3\u7B7E\u6216\u5546\u52A1\u8C08\u5224\u4EE3\u7406", "\u8BC9\u8BBC\u4EF2\u88C1\u670D\u52A1", "\u5927\u6279\u91CF\u5408\u540C\u7684\u6301\u7EED\u5BA1\u67E5"]
    },
    "\u80A1\u6743\u6FC0\u52B1": {
      intro: "\u7ED3\u5408\u4EBA\u5458\u8303\u56F4\u3001\u6FC0\u52B1\u76EE\u6807\u548C\u516C\u53F8\u9636\u6BB5\uFF0C\u8BBE\u8BA1\u517C\u987E\u6FC0\u52B1\u6548\u679C\u4E0E\u63A7\u5236\u6743\u7684\u5B9E\u65BD\u65B9\u6848\u3002",
      suitableFor: "\u9002\u5408\u5E0C\u671B\u957F\u671F\u7559\u4F4F\u6838\u5FC3\u6210\u5458\u3001\u5EFA\u7ACB\u671F\u6743\u6C60\u6216\u89C4\u8303\u65E2\u6709\u6FC0\u52B1\u5B89\u6392\u7684\u4F01\u4E1A\u3002",
      scope: ["\u660E\u786E\u6FC0\u52B1\u5BF9\u8C61\u4E0E\u6388\u4E88\u903B\u8F91", "\u8BBE\u8BA1\u989D\u5EA6\u3001\u6210\u719F\u671F\u548C\u9000\u51FA\u673A\u5236", "\u8BC4\u4F30\u63A7\u5236\u6743\u53CA\u878D\u8D44\u5F71\u54CD", "\u63D0\u4F9B\u5B9E\u65BD\u6587\u4EF6\u548C\u6C9F\u901A\u5EFA\u8BAE"],
      deliverables: ["\u80A1\u6743\u6FC0\u52B1\u65B9\u6848", "\u6388\u4E88\u4E0E\u6210\u719F\u89C4\u5219", "\u6838\u5FC3\u534F\u8BAE\u6587\u4EF6", "\u5B9E\u65BD\u6C9F\u901A\u6750\u6599"],
      process: ["\u786E\u8BA4\u6FC0\u52B1\u76EE\u6807", "\u8BBF\u8C08\u4E0E\u6D4B\u7B97", "\u65B9\u6848\u8BBE\u8BA1", "\u6587\u4EF6\u4EA4\u4ED8"],
      period: "\u901A\u5E38 3\u20144 \u5468",
      materials: ["\u516C\u53F8\u80A1\u6743\u7ED3\u6784", "\u62DF\u6FC0\u52B1\u4EBA\u5458\u4FE1\u606F", "\u5C97\u4F4D\u548C\u8D21\u732E\u8BF4\u660E", "\u672A\u6765\u878D\u8D44\u8BA1\u5212"],
      exclusions: ["\u4E2A\u4EBA\u7A0E\u52A1\u7B79\u5212", "\u5DE5\u5546\u53D8\u66F4\u4EE3\u529E", "\u52B3\u52A8\u4E89\u8BAE\u5904\u7406"]
    },
    "\u5546\u6807\u6CE8\u518C": {
      intro: "\u5148\u5B8C\u6210\u5546\u6807\u68C0\u7D22\u548C\u7533\u8BF7\u65B9\u6848\u8BC4\u4F30\uFF0C\u518D\u6309\u786E\u8BA4\u7684\u7C7B\u522B\u3001\u8303\u56F4\u548C\u98CE\u9669\u5B89\u6392\u5206\u9636\u6BB5\u529E\u7406\u3002",
      suitableFor: "\u9002\u5408\u9700\u8981\u5EFA\u7ACB\u54C1\u724C\u4FDD\u62A4\u3001\u9996\u6B21\u7533\u8BF7\u5546\u6807\u6216\u8865\u5145\u6838\u5FC3\u7C7B\u522B\u5E03\u5C40\u7684\u4F01\u4E1A\u3002",
      scope: ["\u7533\u8BF7\u4E3B\u4F53\u548C\u5546\u6807\u56FE\u6837\u6838\u5BF9", "\u8FD1\u4F3C\u68C0\u7D22\u4E0E\u6CE8\u518C\u98CE\u9669\u5206\u6790", "\u5546\u54C1\u6216\u670D\u52A1\u7C7B\u522B\u5EFA\u8BAE", "\u7533\u8BF7\u6587\u4EF6\u51C6\u5907\u3001\u63D0\u4EA4\u4E0E\u8FDB\u5EA6\u8DDF\u8FDB"],
      deliverables: ["\u5546\u6807\u68C0\u7D22\u5206\u6790", "\u7C7B\u522B\u4E0E\u7533\u8BF7\u7B56\u7565\u5EFA\u8BAE", "\u5B9A\u7A3F\u7533\u8BF7\u6587\u4EF6", "\u63D0\u4EA4\u56DE\u6267\u53CA\u5BA1\u67E5\u7ED3\u679C\u540C\u6B65"],
      process: ["\u63D0\u4EA4\u57FA\u7840\u6750\u6599", "\u56E2\u961F\u8BC4\u4F30\u5E76\u62A5\u4EF7", "\u7B7E\u7EA6\u5E76\u652F\u4ED8\u7B2C\u4E00\u9636\u6BB5\u670D\u52A1\u6B3E", "\u786E\u8BA4\u7533\u8BF7\u6587\u4EF6", "\u652F\u4ED8\u7B2C\u4E8C\u9636\u6BB5\u670D\u52A1\u6B3E\u5E76\u6B63\u5F0F\u63D0\u4EA4", "\u8DDF\u8FDB\u5BA1\u67E5\u7ED3\u679C"],
      period: "\u9884\u8BA1 3\u20146 \u4E2A\u6708\uFF0C\u4E3B\u7BA1\u673A\u6784\u5BA1\u67E5\u65F6\u95F4\u53E6\u8BA1",
      materials: ["\u7533\u8BF7\u4E3B\u4F53\u8BC1\u7167", "\u5546\u6807\u6587\u5B57\u6216\u56FE\u6837", "\u62DF\u4F7F\u7528\u7684\u5546\u54C1\u6216\u670D\u52A1\u8303\u56F4"],
      exclusions: ["\u4E3B\u7BA1\u673A\u6784\u6536\u53D6\u7684\u5B98\u65B9\u8D39\u7528", "\u672A\u7EA6\u5B9A\u7684\u590D\u5BA1\u3001\u5F02\u8BAE\u6216\u8BC9\u8BBC\u670D\u52A1"]
    },
    "\u4E13\u5229\u7533\u8BF7": {
      intro: "\u57FA\u4E8E\u6280\u672F\u65B9\u6848\u5B8C\u6210\u53EF\u7533\u8BF7\u6027\u8BC4\u4F30\u3001\u6587\u4EF6\u64B0\u5199\u4E0E\u5B9A\u7A3F\uFF0C\u518D\u8FDB\u5165\u6B63\u5F0F\u63D0\u4EA4\u548C\u5BA1\u67E5\u8DDF\u8FDB\u3002",
      suitableFor: "\u9002\u5408\u62E5\u6709\u65B0\u6280\u672F\u65B9\u6848\u3001\u4EA7\u54C1\u7ED3\u6784\u6216\u5DE5\u827A\u65B9\u6CD5\uFF0C\u9700\u8981\u8BC4\u4F30\u4E13\u5229\u4FDD\u62A4\u8DEF\u5F84\u7684\u4F01\u4E1A\u3002",
      scope: ["\u6280\u672F\u4EA4\u5E95\u4E0E\u7533\u8BF7\u7C7B\u578B\u8BC4\u4F30", "\u73B0\u6709\u6280\u672F\u68C0\u7D22\u53CA\u98CE\u9669\u63D0\u793A", "\u7533\u8BF7\u6587\u4EF6\u64B0\u5199\u4E0E\u5B9A\u7A3F", "\u6B63\u5F0F\u63D0\u4EA4\u548C\u5BA1\u67E5\u8FDB\u5EA6\u8DDF\u8FDB"],
      deliverables: ["\u68C0\u7D22\u6216\u53EF\u7533\u8BF7\u6027\u5206\u6790", "\u4E13\u5229\u7533\u8BF7\u6587\u4EF6", "\u6B63\u5F0F\u63D0\u4EA4\u56DE\u6267", "\u5BA1\u67E5\u610F\u89C1\u4E0E\u7ED3\u679C\u540C\u6B65"],
      process: ["\u63D0\u4EA4\u6280\u672F\u8D44\u6599", "\u56E2\u961F\u8BC4\u4F30\u5E76\u62A5\u4EF7", "\u652F\u4ED8\u7B2C\u4E00\u9636\u6BB5\u670D\u52A1\u6B3E", "\u786E\u8BA4\u7533\u8BF7\u6587\u4EF6", "\u652F\u4ED8\u7B2C\u4E8C\u9636\u6BB5\u670D\u52A1\u6B3E\u5E76\u6B63\u5F0F\u63D0\u4EA4", "\u8DDF\u8FDB\u5BA1\u67E5\u7ED3\u679C"],
      period: "\u9884\u8BA1 3\u20146 \u4E2A\u6708\uFF0C\u4E3B\u7BA1\u673A\u6784\u5BA1\u67E5\u65F6\u95F4\u53E6\u8BA1",
      materials: ["\u6280\u672F\u4EA4\u5E95\u4E66", "\u4EA7\u54C1\u56FE\u7EB8\u6216\u6D41\u7A0B\u8BF4\u660E", "\u53D1\u660E\u4EBA\u53CA\u7533\u8BF7\u4EBA\u4FE1\u606F"],
      exclusions: ["\u4E3B\u7BA1\u673A\u6784\u6536\u53D6\u7684\u5B98\u65B9\u8D39\u7528", "\u672A\u7EA6\u5B9A\u7684\u7B54\u590D\u3001\u590D\u5BA1\u6216\u8BC9\u8BBC\u670D\u52A1"]
    },
    "\u9AD8\u65B0\u6280\u672F\u4F01\u4E1A\u8BA4\u5B9A": {
      intro: "\u5148\u6838\u9A8C\u4F01\u4E1A\u57FA\u7840\u6761\u4EF6\u548C\u8D44\u6599\u5B8C\u6574\u5EA6\uFF0C\u518D\u786E\u5B9A\u7533\u62A5\u8303\u56F4\u3001\u4E24\u9636\u6BB5\u6210\u679C\u548C\u529E\u7406\u8BA1\u5212\u3002",
      suitableFor: "\u9002\u5408\u5177\u5907\u7814\u53D1\u6D3B\u52A8\u3001\u77E5\u8BC6\u4EA7\u6743\u548C\u79D1\u6280\u6210\u679C\u8F6C\u5316\u57FA\u7840\uFF0C\u8BA1\u5212\u7533\u62A5\u9AD8\u65B0\u6280\u672F\u4F01\u4E1A\u8BA4\u5B9A\u7684\u4F01\u4E1A\u3002",
      scope: ["\u7533\u62A5\u8D44\u683C\u4E0E\u5DEE\u8DDD\u8BC4\u4F30", "\u7814\u53D1\u53CA\u77E5\u8BC6\u4EA7\u6743\u8D44\u6599\u89C4\u5212", "\u7533\u62A5\u6750\u6599\u6574\u7406\u4E0E\u5B9A\u7A3F", "\u6B63\u5F0F\u7533\u62A5\u4E0E\u8BC4\u5BA1\u8FDB\u5EA6\u8DDF\u8FDB"],
      deliverables: ["\u8D44\u683C\u8BC4\u4F30\u62A5\u544A", "\u7533\u62A5\u6750\u6599\u6E05\u5355\u4E0E\u89C4\u5212", "\u5B9A\u7A3F\u7533\u62A5\u6750\u6599", "\u63D0\u4EA4\u8BB0\u5F55\u53CA\u7ED3\u679C\u540C\u6B65"],
      process: ["\u63D0\u4EA4\u4F01\u4E1A\u8D44\u6599", "\u56E2\u961F\u8BC4\u4F30\u5E76\u62A5\u4EF7", "\u652F\u4ED8\u7B2C\u4E00\u9636\u6BB5\u670D\u52A1\u6B3E", "\u786E\u8BA4\u7533\u62A5\u6750\u6599", "\u652F\u4ED8\u7B2C\u4E8C\u9636\u6BB5\u670D\u52A1\u6B3E\u5E76\u6B63\u5F0F\u7533\u62A5", "\u8DDF\u8FDB\u8BC4\u5BA1\u7ED3\u679C"],
      period: "\u9884\u8BA1 2\u20144 \u4E2A\u6708\uFF0C\u4EE5\u7533\u62A5\u7A97\u53E3\u548C\u8BC4\u5BA1\u5B89\u6392\u4E3A\u51C6",
      materials: ["\u4F01\u4E1A\u8BC1\u7167\u53CA\u4EBA\u5458\u60C5\u51B5", "\u77E5\u8BC6\u4EA7\u6743\u548C\u7814\u53D1\u9879\u76EE\u8D44\u6599", "\u8D22\u52A1\u53CA\u6536\u5165\u76F8\u5173\u8D44\u6599"],
      exclusions: ["\u5BA1\u8BA1\u3001\u9274\u8BC1\u7B49\u7B2C\u4E09\u65B9\u8D39\u7528", "\u672A\u5728\u65B9\u6848\u4E2D\u7EA6\u5B9A\u7684\u8D44\u6599\u6574\u6539\u6216\u65B0\u589E\u9879\u76EE"]
    },
    "\u4E13\u7CBE\u7279\u65B0\u7533\u62A5": {
      intro: "\u7ED3\u5408\u4F01\u4E1A\u89C4\u6A21\u3001\u7ECF\u8425\u6307\u6807\u548C\u4E13\u4E1A\u5316\u80FD\u529B\u5B8C\u6210\u8D44\u683C\u8BC4\u4F30\uFF0C\u5E76\u6309\u7533\u62A5\u7A97\u53E3\u63A8\u8FDB\u6750\u6599\u51C6\u5907\u3002",
      suitableFor: "\u9002\u5408\u4E3B\u8425\u4E1A\u52A1\u805A\u7126\u3001\u5177\u5907\u4E13\u4E1A\u5316\u548C\u521B\u65B0\u80FD\u529B\uFF0C\u8BA1\u5212\u7533\u62A5\u4E13\u7CBE\u7279\u65B0\u8D44\u8D28\u7684\u4F01\u4E1A\u3002",
      scope: ["\u4F01\u4E1A\u6761\u4EF6\u4E0E\u7533\u62A5\u53E3\u5F84\u8BC4\u4F30", "\u6307\u6807\u5DEE\u8DDD\u53CA\u8865\u5145\u6750\u6599\u5EFA\u8BAE", "\u7533\u62A5\u6750\u6599\u6574\u7406\u4E0E\u5B9A\u7A3F", "\u6B63\u5F0F\u7533\u62A5\u53CA\u8FDB\u5EA6\u8DDF\u8FDB"],
      deliverables: ["\u8D44\u683C\u8BC4\u4F30\u7ED3\u8BBA", "\u6750\u6599\u6E05\u5355\u548C\u5DEE\u8DDD\u5EFA\u8BAE", "\u5B9A\u7A3F\u7533\u62A5\u6750\u6599", "\u63D0\u4EA4\u8BB0\u5F55\u53CA\u7ED3\u679C\u540C\u6B65"],
      process: ["\u63D0\u4EA4\u4F01\u4E1A\u8D44\u6599", "\u56E2\u961F\u8BC4\u4F30\u5E76\u62A5\u4EF7", "\u652F\u4ED8\u7B2C\u4E00\u9636\u6BB5\u670D\u52A1\u6B3E", "\u786E\u8BA4\u7533\u62A5\u6750\u6599", "\u652F\u4ED8\u7B2C\u4E8C\u9636\u6BB5\u670D\u52A1\u6B3E\u5E76\u6B63\u5F0F\u7533\u62A5", "\u8DDF\u8FDB\u8BC4\u5BA1\u7ED3\u679C"],
      period: "\u4EE5\u5F53\u5730\u7533\u62A5\u7A97\u53E3\u548C\u8BC4\u5BA1\u5B89\u6392\u4E3A\u51C6",
      materials: ["\u4F01\u4E1A\u57FA\u672C\u4FE1\u606F", "\u4E3B\u8425\u4E1A\u52A1\u53CA\u7ECF\u8425\u6570\u636E", "\u521B\u65B0\u6210\u679C\u4E0E\u8D44\u8D28\u6750\u6599"],
      exclusions: ["\u5BA1\u8BA1\u3001\u68C0\u6D4B\u7B49\u7B2C\u4E09\u65B9\u8D39\u7528", "\u672A\u7EA6\u5B9A\u7684\u8D44\u8D28\u8865\u529E\u6216\u957F\u671F\u8F85\u5BFC"]
    },
    "\u79D1\u6280\u9879\u76EE\u7533\u62A5": {
      intro: "\u6839\u636E\u4F01\u4E1A\u6761\u4EF6\u548C\u7533\u62A5\u901A\u77E5\u8BC4\u4F30\u9002\u914D\u9879\u76EE\uFF0C\u786E\u8BA4\u6750\u6599\u8303\u56F4\u540E\u5206\u9636\u6BB5\u5B8C\u6210\u7533\u62A5\u3002",
      suitableFor: "\u9002\u5408\u5E0C\u671B\u7533\u8BF7\u79D1\u6280\u8BA1\u5212\u3001\u4E13\u9879\u8D44\u91D1\u6216\u4EA7\u4E1A\u652F\u6301\u9879\u76EE\u7684\u79D1\u6280\u578B\u4F01\u4E1A\u3002",
      scope: ["\u7533\u62A5\u9879\u76EE\u9002\u914D\u8BC4\u4F30", "\u7533\u62A5\u6761\u4EF6\u548C\u6750\u6599\u5DEE\u8DDD\u5206\u6790", "\u7533\u62A5\u6750\u6599\u6574\u7406\u4E0E\u5B9A\u7A3F", "\u6B63\u5F0F\u7533\u62A5\u53CA\u540E\u7EED\u8DDF\u8FDB"],
      deliverables: ["\u9879\u76EE\u9002\u914D\u5EFA\u8BAE", "\u7533\u62A5\u6750\u6599\u6E05\u5355", "\u5B9A\u7A3F\u7533\u62A5\u6750\u6599", "\u63D0\u4EA4\u8BB0\u5F55\u53CA\u7ED3\u679C\u540C\u6B65"],
      process: ["\u63D0\u4EA4\u4F01\u4E1A\u8D44\u6599", "\u56E2\u961F\u8BC4\u4F30\u5E76\u62A5\u4EF7", "\u652F\u4ED8\u7B2C\u4E00\u9636\u6BB5\u670D\u52A1\u6B3E", "\u786E\u8BA4\u7533\u62A5\u6750\u6599", "\u652F\u4ED8\u7B2C\u4E8C\u9636\u6BB5\u670D\u52A1\u6B3E\u5E76\u6B63\u5F0F\u7533\u62A5", "\u8DDF\u8FDB\u8BC4\u5BA1\u7ED3\u679C"],
      period: "\u4EE5\u5177\u4F53\u9879\u76EE\u7533\u62A5\u901A\u77E5\u4E3A\u51C6",
      materials: ["\u4F01\u4E1A\u53CA\u56E2\u961F\u4FE1\u606F", "\u9879\u76EE\u6280\u672F\u4E0E\u5546\u4E1A\u8D44\u6599", "\u8D22\u52A1\u53CA\u77E5\u8BC6\u4EA7\u6743\u6750\u6599"],
      exclusions: ["\u5BA1\u8BA1\u3001\u68C0\u6D4B\u7B49\u7B2C\u4E09\u65B9\u8D39\u7528", "\u7533\u62A5\u8303\u56F4\u4E4B\u5916\u7684\u957F\u671F\u54A8\u8BE2\u670D\u52A1"]
    }
  };
  var defaultServiceBlueprint = {
    intro: "\u7531\u56E2\u961F\u6839\u636E\u4F01\u4E1A\u5F53\u524D\u60C5\u51B5\u786E\u8BA4\u670D\u52A1\u8FB9\u754C\uFF0C\u5F62\u6210\u53EF\u6267\u884C\u7684\u4E13\u4E1A\u670D\u52A1\u65B9\u6848\u3002",
    suitableFor: "\u9002\u5408\u9700\u8981\u8BE5\u9879\u4E13\u4E1A\u652F\u6301\uFF0C\u5E76\u5E0C\u671B\u5148\u660E\u786E\u8303\u56F4\u3001\u5468\u671F\u548C\u4EA4\u4ED8\u6210\u679C\u7684\u4F01\u4E1A\u3002",
    scope: ["\u4E86\u89E3\u4F01\u4E1A\u80CC\u666F\u548C\u5177\u4F53\u76EE\u6807", "\u8BC6\u522B\u5173\u952E\u95EE\u9898\u4E0E\u670D\u52A1\u8FB9\u754C", "\u5F62\u6210\u670D\u52A1\u5EFA\u8BAE\u548C\u5B9E\u65BD\u8DEF\u5F84", "\u6309\u786E\u8BA4\u65B9\u6848\u5B8C\u6210\u4EA4\u4ED8"],
    deliverables: ["\u670D\u52A1\u65B9\u6848\u8BF4\u660E", "\u7EA6\u5B9A\u8303\u56F4\u5185\u7684\u4E13\u4E1A\u6587\u4EF6", "\u5173\u952E\u4E8B\u9879\u6C9F\u901A\u8BB0\u5F55", "\u4E00\u6B21\u4EA4\u4ED8\u8BF4\u660E"],
    process: ["\u63D0\u4EA4\u9700\u6C42", "\u987E\u95EE\u6C9F\u901A", "\u786E\u8BA4\u65B9\u6848", "\u5B8C\u6210\u4EA4\u4ED8"],
    period: "\u4EE5\u53CC\u65B9\u786E\u8BA4\u65B9\u6848\u4E3A\u51C6",
    materials: ["\u4F01\u4E1A\u57FA\u672C\u4FE1\u606F", "\u4E0E\u9700\u6C42\u76F8\u5173\u7684\u73B0\u6709\u6750\u6599", "\u671F\u671B\u5B8C\u6210\u65F6\u95F4"],
    exclusions: ["\u672A\u5728\u670D\u52A1\u65B9\u6848\u4E2D\u660E\u786E\u7EA6\u5B9A\u7684\u65B0\u589E\u4E8B\u9879"]
  };

  // src/pages/p10-service/index.js
  function domainOptions6() {
    return {
      categories,
      chatMessages: store.chatMessages,
      demands: store.demands,
      teams: store.teams,
      user
    };
  }
  function startDirectConsultation2(teamId, sku) {
    const team = getTeam(teamId, store.teams);
    if (!team) {
      toast("\u6682\u65F6\u65E0\u6CD5\u627E\u5230\u8BE5\u56E2\u961F");
      return;
    }
    const serviceName = sku || team.skus[0];
    const demand = getOrCreateDirectConsultation(teamId, serviceName, domainOptions6());
    emitChange();
    navigateTo("p7", { demandId: demand.id, teamId, sku: serviceName, direct: true });
  }
  var page10 = {
    getBlueprint(sku) {
      if (serviceBlueprints[sku]) return serviceBlueprints[sku];
      return {
        intro: defaultServiceBlueprint.intro,
        suitableFor: defaultServiceBlueprint.suitableFor,
        scope: defaultServiceBlueprint.scope.slice(),
        deliverables: defaultServiceBlueprint.deliverables.slice(),
        process: defaultServiceBlueprint.process.slice(),
        period: defaultServiceBlueprint.period,
        materials: defaultServiceBlueprint.materials.slice(),
        exclusions: defaultServiceBlueprint.exclusions.slice()
      };
    },
    renderList(items) {
      return '<ul class="p10-check-list">' + items.map((item) => "<li>" + escapeHTML(item) + "</li>").join("") + "</ul>";
    },
    render(params) {
      const team = getTeam(params.teamId, store.teams);
      const sku = params.sku || team && team.skus[0];
      if (!team || !sku) return '<div class="empty-state"><div class="empty-title">\u670D\u52A1\u4E0D\u5B58\u5728</div></div>';
      const detail = this.getBlueprint(sku);
      const staged = getStagedServiceConfig(sku);
      const category = getCategoryForSku(sku, categories);
      const safeTeamId = escapeHTML(team.id);
      const safeSku = escapeHTML(sku);
      let html = '<div class="nav-bar"><button class="nav-back" id="p10Back">' + icon("chevron-left", 22) + '</button><div class="nav-title">\u670D\u52A1\u8BE6\u60C5</div><div style="width:40px"></div></div>';
      html += '<header class="p10-summary"><div class="p10-summary-label">' + escapeHTML(category && category.name || "\u4F01\u4E1A\u670D\u52A1") + "</div><h1>" + safeSku + "</h1><p>" + detail.intro + '</p><div class="p10-summary-meta"><strong>' + (staged ? "\u6309\u9879\u76EE\u8BC4\u4F30\u62A5\u4EF7" : team.priceText) + "</strong><span>" + team.priceMode + "</span><span>" + detail.period + "</span></div></header>";
      html += '<button class="p10-team-row" id="p10TeamLink" type="button" data-team-id="' + safeTeamId + '" data-sku="' + safeSku + '"><span class="avatar avatar-sm" style="background:' + team.avatarColor + "20;color:" + team.avatarColor + '">' + team.avatar + "</span><span><strong>" + team.name + "</strong><small>" + team.orgShort + " \xB7 " + icon("check-circle", 12) + " \u8D44\u8D28\u5DF2\u6838\u9A8C</small></span>" + icon("chevron-right", 16) + "</button>";
      html += '<main class="p10-content"><section><h2>\u9002\u5408\u8C01</h2><p>' + detail.suitableFor + "</p></section><section><h2>\u670D\u52A1\u5185\u5BB9</h2>" + this.renderList(detail.scope) + "</section><section><h2>\u4EA4\u4ED8\u6210\u679C</h2>" + this.renderList(detail.deliverables) + '</section><section><h2>\u670D\u52A1\u6D41\u7A0B</h2><ol class="p10-process">' + detail.process.map((step, index) => "<li><b>" + (index + 1) + "</b><span>" + step + "</span></li>").join("") + "</ol></section><section><h2>\u9700\u8981\u51C6\u5907</h2>" + this.renderList(detail.materials) + "</section>" + (staged ? '<section class="p10-staged-payment"><div class="p10-staged-title"><div><h2>\u5206\u9636\u6BB5\u4ED8\u6B3E</h2><p>\u786E\u8BA4\u524D\u4E00\u9636\u6BB5\u6210\u679C\u540E\uFF0C\u518D\u89E6\u53D1\u4E0B\u4E00\u7B14\u670D\u52A1\u6B3E\u3002</p></div><span>\u4E24\u7B14\u5404 50%</span></div><div class="p10-stage-row"><b>\u7B2C\u4E00\u9636\u6BB5\u670D\u52A1\u6B3E</b><span>\u534F\u8BAE\u751F\u6548\u540E\u652F\u4ED8</span></div><div class="p10-stage-row"><b>\u7B2C\u4E8C\u9636\u6BB5\u670D\u52A1\u6B3E</b><span>' + escapeHTML(staged.secondTrigger) + '</span></div><div class="p10-result-risk">' + icon("alert", 16) + "<p><strong>\u6700\u7EC8\u7ED3\u679C\u4E0D\u627F\u8BFA</strong>\u4E3B\u7BA1\u673A\u6784\u7684\u5BA1\u67E5\u6216\u8BC4\u5BA1\u5B58\u5728\u4E0D\u786E\u5B9A\u6027\uFF1B\u5DF2\u5B8C\u6210\u9636\u6BB5\u7684\u670D\u52A1\u8D39\u4E0D\u56E0\u6700\u7EC8\u672A\u83B7\u6279\u800C\u9000\u8FD8\uFF0C\u670D\u52A1\u5546\u672A\u6309\u7EA6\u5C65\u884C\u7684\u9664\u5916\u3002</p></div></section>" : "") + '<section class="p10-exclusions"><h2>\u8D39\u7528\u901A\u5E38\u4E0D\u5305\u542B</h2>' + this.renderList(detail.exclusions) + "<p>\u6700\u7EC8\u670D\u52A1\u8303\u56F4\u3001\u62A5\u4EF7\u548C\u5468\u671F\uFF0C\u4EE5\u53CC\u65B9\u786E\u8BA4\u7684\u670D\u52A1\u65B9\u6848\u4E3A\u51C6\u3002</p></section></main>";
      html += '<div class="bottom-bar p10-bottom"><div><small>' + (staged ? "\u62A5\u4EF7\u65B9\u5F0F" : "\u53C2\u8003\u8D77\u4EF7") + "</small><strong>" + (staged ? "\u8BC4\u4F30\u540E\u62A5\u4EF7" : team.priceText) + '</strong></div><button class="btn btn-primary" id="p10Consult" data-team-id="' + safeTeamId + '" data-sku="' + safeSku + '">' + (staged ? "\u54A8\u8BE2\u5E76\u83B7\u53D6\u65B9\u6848" : "\u54A8\u8BE2\u8BE5\u9879\u670D\u52A1") + "</button></div>";
      return html;
    },
    init() {
      showTabBar(false);
      const backButton = document.getElementById("p10Back");
      if (backButton) backButton.addEventListener("click", goBackToPrevious);
      const teamLink = document.getElementById("p10TeamLink");
      if (teamLink) teamLink.addEventListener("click", () => {
        navigateTo("p3", { teamId: teamLink.getAttribute("data-team-id"), sku: teamLink.getAttribute("data-sku") });
      });
      const consultButton = document.getElementById("p10Consult");
      if (consultButton) consultButton.addEventListener("click", () => {
        const teamId = consultButton.getAttribute("data-team-id");
        const sku = consultButton.getAttribute("data-sku");
        if (getStagedServiceConfig(sku)) navigateTo("p13", { teamId, sku });
        else startDirectConsultation2(teamId, sku);
      });
    }
  };
  register("p10", page10);

  // src/pages/p11-agents/index.js
  var sessions = /* @__PURE__ */ new Map();
  var fileConsentSuppliers = /* @__PURE__ */ new Set();
  var activeCategory = "all";
  var walletBalance = 128;
  function getSession(agent) {
    if (!sessions.has(agent.id)) {
      sessions.set(agent.id, {
        typing: false,
        messages: [
          {
            role: "agent",
            content: "\u4F60\u597D\uFF0C\u6211\u662F\u7531" + agent.supplier.name + "\u63D0\u4F9B\u7684" + agent.name + "\u3002" + agent.description + "\u4F60\u53EF\u4EE5\u76F4\u63A5\u63CF\u8FF0\u95EE\u9898\uFF0C\u4E5F\u53EF\u4EE5\u4E0A\u4F20\u76F8\u5173\u6750\u6599\u3002"
          }
        ]
      });
    }
    return sessions.get(agent.id);
  }
  function renderHeader(title, action) {
    return '<div class="nav-bar"><button class="nav-back" id="p11Back" type="button" aria-label="\u8FD4\u56DE">' + icon("chevron-left", 22) + '</button><div class="nav-title">' + escapeHTML(title) + "</div>" + (action || '<div class="nav-action"></div>') + "</div>";
  }
  function renderAgentCard(agent) {
    const paused = agent.status === "paused";
    return '<article class="p11-agent-card' + (paused ? " is-paused" : "") + '"><div class="p11-agent-head"><span class="p11-agent-symbol">' + icon(agent.icon, 22) + '</span><div class="p11-agent-title"><div><h2>' + escapeHTML(agent.name) + "</h2>" + (agent.recommended ? '<b class="p11-agent-recommended">\u5E73\u53F0\u63A8\u8350</b>' : "") + (paused ? '<b class="p11-agent-paused">\u6682\u505C\u670D\u52A1</b>' : "") + "</div><span>\u7531 " + escapeHTML(agent.supplier.name) + ' \u63D0\u4F9B</span></div></div><div class="p11-agent-tags">' + agent.tags.slice(0, 2).map((tag) => "<span>" + escapeHTML(tag) + "</span>").join("") + "</div><p>" + escapeHTML(agent.description) + '</p><div class="p11-agent-footer"><div class="p11-agent-meta"><span class="p11-agent-rating">' + icon("star", 12) + agent.rating.toFixed(1) + " \xB7 " + agent.reviewCount + " \u6761\u8BC4\u4EF7</span><strong>" + escapeHTML(agent.price) + '</strong></div><button class="p11-agent-start" type="button" data-agent-id="' + agent.id + '"' + (paused ? ' disabled aria-disabled="true"' : "") + ">" + (paused ? "\u6682\u505C\u670D\u52A1" : "\u5F00\u59CB\u54A8\u8BE2 " + icon("arrow-right", 14)) + "</button></div></article>";
  }
  function renderAgentList(category) {
    const visible = getAgentsByCategory(category);
    const activeCount = visible.filter((agent) => agent.status === "active").length;
    return '<div class="p11-page">' + renderHeader("\u667A\u80FD\u4F53\u4E13\u533A", '<button class="p11-energy" id="p11Energy" type="button">' + icon("zap", 14) + walletBalance.toFixed(1) + " \u70B9</button>") + '<section class="p11-intro"><span class="p11-intro-icon">' + icon("sparkles", 25) + "</span><div><h1>\u6309\u667A\u80FD\u4F53\u9009\u62E9\u4E13\u4E1A\u80FD\u529B</h1><p>\u6BCF\u4E2A\u667A\u80FD\u4F53\u7531\u5BF9\u5E94\u4F9B\u5E94\u5546\u72EC\u7ACB\u63D0\u4F9B\uFF0C\u53EF\u5206\u522B\u54A8\u8BE2\u548C\u4ED8\u8D39\u3002</p><span>" + activeCount + ' \u4E2A\u667A\u80FD\u4F53\u5F53\u524D\u53EF\u7528</span></div></section><div class="p11-tabs" role="tablist">' + agentCategories.map((item) => '<button type="button" role="tab" aria-selected="' + (item.id === category) + '" class="p11-tab' + (item.id === category ? " active" : "") + '" data-agent-category="' + item.id + '">' + item.name + "</button>").join("") + '</div><section class="p11-list" aria-label="\u667A\u80FD\u4F53\u5217\u8868">' + visible.map(renderAgentCard).join("") + '</section><p class="p11-disclaimer">\u667A\u80FD\u4F53\u56DE\u7B54\u4EC5\u4F9B\u521D\u6B65\u53C2\u8003\u3002\u540C\u4E00\u95EE\u9898\u53EF\u4EE5\u5206\u522B\u54A8\u8BE2\u591A\u4E2A\u667A\u80FD\u4F53\uFF0C\u6BCF\u4E2A\u5165\u53E3\u72EC\u7ACB\u8BA1\u8D39\u3002</p></div>';
  }
  function shouldShowHumanCard(session) {
    if (!session.messages.some((message) => message.role === "user")) return false;
    return session.messages.at(-1)?.role === "agent";
  }
  function renderHumanCard(agent) {
    return '<section class="p11-human-card"><span>' + icon("users", 19) + '</span><div><strong>\u9700\u8981\u771F\u4EBA\u56E2\u961F\u7EE7\u7EED\u5904\u7406\uFF1F</strong><p>\u5E73\u53F0\u53EF\u6839\u636E\u5F53\u524D\u95EE\u9898\uFF0C\u4E3A\u4F60\u5339\u914D\u5DF2\u6838\u9A8C\u4E14\u6B63\u5728\u670D\u52A1\u7684\u4E13\u4E1A\u56E2\u961F\u3002</p><button type="button" id="p11HumanMatch">\u5339\u914D\u5E73\u53F0\u56E2\u961F ' + icon("arrow-right", 13) + "</button></div></section>";
  }
  function renderChat(agent) {
    const session = getSession(agent);
    const paused = agent.status === "paused";
    const messages = session.messages.map(
      (message) => '<div class="p11-message ' + message.role + '"><span class="p11-message-avatar">' + (message.role === "user" ? icon("user", 18) : icon(agent.icon, 18)) + '</span><div><div class="p11-message-bubble">' + escapeHTML(message.content) + "</div>" + (message.role === "agent" ? '<div class="p11-message-source">\u7531 ' + escapeHTML(agent.supplier.name) + " \u63D0\u4F9B</div>" : "") + "</div></div>"
    ).join("");
    const pausedBanner = paused ? '<div class="p11-unavailable">' + icon("pause", 16) + "<span><strong>\u8BE5\u667A\u80FD\u4F53\u6682\u505C\u670D\u52A1</strong><small>\u5386\u53F2\u5BF9\u8BDD\u4ECD\u53EF\u67E5\u770B\uFF0C\u6062\u590D\u670D\u52A1\u540E\u53EF\u7EE7\u7EED\u53D1\u9001\u6D88\u606F\u3002</small></span></div>" : "";
    const humanCard = shouldShowHumanCard(session) ? renderHumanCard(agent) : "";
    return '<div class="p11-page p11-chat-page">' + renderHeader(agent.name, '<button class="p11-clear" id="p11Clear" type="button">\u6E05\u7A7A</button>') + '<div class="p11-provider-bar"><span class="p11-provider-mark">' + icon("bot", 18) + "</span><span><small>\u670D\u52A1\u4F9B\u5E94\u5546</small><strong>" + escapeHTML(agent.supplier.name) + '</strong></span><span class="p11-provider-price">' + escapeHTML(agent.price) + "</span></div>" + pausedBanner + '<main class="p11-messages" id="p11Messages">' + messages + (session.typing ? '<div class="p11-message agent"><span class="p11-message-avatar">' + icon(agent.icon, 18) + '</span><div class="p11-thinking"><i></i><i></i><i></i><span>\u6B63\u5728\u5206\u6790</span></div></div>' : "") + humanCard + '</main><div class="bottom-bar p11-composer' + (paused ? " is-disabled" : "") + '"><div class="p11-prompts">' + (paused ? "" : agent.prompts.map((prompt) => '<button type="button" data-agent-prompt="' + escapeHTML(prompt) + '">' + escapeHTML(prompt) + "</button>").join("")) + '</div><div class="p11-compose-meta"><button class="p11-attach" id="p11Attach" type="button" aria-label="\u4E0A\u4F20\u6750\u6599"' + (paused ? " disabled" : "") + ">" + icon("upload", 18) + "</button><span>\u672C\u6B21\u8C03\u7528 " + escapeHTML(agent.price) + "</span><span>\u4F59\u989D " + walletBalance.toFixed(1) + ' \u70B9</span></div><div class="p11-call-rule">\u4E00\u6761\u63D0\u95EE\u548C\u4E00\u6B21\u5B8C\u6574\u56DE\u590D\u8BA1\u4E3A\u4E00\u6B21\u8C03\u7528\uFF1B\u5931\u8D25\u6216\u91CD\u8BD5\u4E0D\u6263\u8D39\u3002</div><div class="p11-compose-row"><textarea id="p11Input" rows="1" maxlength="4000" placeholder="' + (paused ? "\u8BE5\u667A\u80FD\u4F53\u6682\u505C\u670D\u52A1" : "\u63CF\u8FF0\u4F60\u7684\u95EE\u9898\u2026") + '"' + (paused ? " disabled" : "") + '></textarea><button class="p11-send" id="p11Send" type="button" aria-label="\u53D1\u9001"' + (paused ? " disabled" : "") + ">" + icon("send", 19) + "</button></div></div></div>";
  }
  function replyFor(agent) {
    const replies = {
      contract: "\u6211\u4F1A\u5148\u4ECE\u8D23\u4EFB\u8FB9\u754C\u3001\u8FDD\u7EA6\u8D23\u4EFB\u3001\u89E3\u9664\u6761\u4EF6\u548C\u4E89\u8BAE\u89E3\u51B3\u56DB\u90E8\u5206\u68C0\u67E5\u3002\u8BF7\u4E0A\u4F20\u5408\u540C\uFF0C\u6216\u628A\u9700\u8981\u91CD\u70B9\u786E\u8BA4\u7684\u6761\u6B3E\u7C98\u8D34\u8FDB\u6765\u3002",
      equity: "\u53EF\u4EE5\u5148\u786E\u8BA4\u521B\u59CB\u6210\u5458\u7684\u89D2\u8272\u3001\u5168\u804C\u6295\u5165\u3001\u5386\u53F2\u8D21\u732E\u548C\u540E\u7EED\u878D\u8D44\u8BA1\u5212\uFF0C\u518D\u636E\u6B64\u8BA8\u8BBA\u6BD4\u4F8B\u4E0E\u63A7\u5236\u6743\u5B89\u6392\u3002",
      "tax-policy": "\u6211\u53EF\u4EE5\u6309\u4F01\u4E1A\u7C7B\u578B\u3001\u6240\u5728\u5730\u533A\u548C\u4E1A\u52A1\u9636\u6BB5\u68B3\u7406\u9002\u7528\u653F\u7B56\uFF0C\u5E76\u628A\u9002\u7528\u6761\u4EF6\u4E0E\u7533\u62A5\u8282\u70B9\u5206\u5F00\u8BF4\u660E\u3002",
      trademark: "\u8BF7\u544A\u8BC9\u6211\u5546\u6807\u540D\u79F0\u3001\u4F7F\u7528\u5546\u54C1\u6216\u670D\u52A1\u4EE5\u53CA\u76EE\u6807\u5730\u533A\uFF0C\u6211\u4F1A\u5148\u7ED9\u51FA\u7C7B\u522B\u5EFA\u8BAE\u548C\u8FD1\u4F3C\u98CE\u9669\u63D0\u793A\u3002",
      patent: "\u8BF7\u7B80\u8981\u8BF4\u660E\u6280\u672F\u65B9\u6848\u89E3\u51B3\u7684\u95EE\u9898\u3001\u6838\u5FC3\u6B65\u9AA4\u548C\u4E0E\u73B0\u6709\u65B9\u6848\u7684\u5DEE\u5F02\uFF0C\u6211\u4F1A\u5148\u68B3\u7406\u53EF\u4FDD\u62A4\u7684\u521B\u65B0\u70B9\u3002",
      "hr-policy": "\u6211\u4F1A\u7ED3\u5408\u56E2\u961F\u89C4\u6A21\u548C\u73B0\u884C\u505A\u6CD5\uFF0C\u5148\u5217\u5236\u5EA6\u6846\u67B6\uFF0C\u518D\u63D0\u793A\u5BB9\u6613\u4EA7\u751F\u52B3\u52A8\u4E89\u8BAE\u7684\u6761\u6B3E\u3002"
    };
    return replies[agent.capabilityId] || "\u6211\u5DF2\u6536\u5230\u4F60\u7684\u95EE\u9898\uFF0C\u4F1A\u6309\u5173\u952E\u4E8B\u5B9E\u3001\u98CE\u9669\u70B9\u548C\u4E0B\u4E00\u6B65\u5EFA\u8BAE\u4E09\u4E2A\u90E8\u5206\u4E3A\u4F60\u6574\u7406\u3002";
  }
  function requestFileConsent(agent) {
    if (fileConsentSuppliers.has(agent.supplier.id)) {
      toast("\u5DF2\u9009\u62E9\u793A\u4F8B\u6587\u4EF6\uFF1A\u5408\u4F5C\u534F\u8BAE.pdf");
      return;
    }
    showModal({
      title: "\u4E0A\u4F20\u524D\u8BF7\u786E\u8BA4",
      body: "<p>\u4E3A\u5B8C\u6210\u672C\u6B21\u5206\u6790\uFF0C\u4F60\u4E0A\u4F20\u7684\u6587\u4EF6\u5C06\u4F20\u8F93\u7ED9<strong>" + escapeHTML(agent.supplier.name) + "</strong>\u5904\u7406\u3002\u8BF7\u786E\u8BA4\u6587\u4EF6\u4E2D\u4E0D\u5305\u542B\u65E0\u9700\u63D0\u4F9B\u7684\u654F\u611F\u4FE1\u606F\u3002</p>",
      cancelText: "\u6682\u4E0D\u4E0A\u4F20",
      confirmText: "\u540C\u610F\u5E76\u9009\u62E9\u6587\u4EF6",
      onConfirm() {
        fileConsentSuppliers.add(agent.supplier.id);
        toast("\u5DF2\u9009\u62E9\u793A\u4F8B\u6587\u4EF6\uFF1A\u5408\u4F5C\u534F\u8BAE.pdf");
      }
    });
  }
  var page11 = {
    render(params) {
      if (params.agentId) return renderChat(getAgent(params.agentId));
      if (params.category && agentCategories.some((item) => item.id === params.category)) activeCategory = params.category;
      return renderAgentList(activeCategory);
    },
    init(params) {
      showTabBar(false);
      document.getElementById("p11Back").addEventListener("click", goBackToPrevious);
      if (!params.agentId) {
        document.querySelectorAll("[data-agent-category]").forEach((button) => {
          button.addEventListener("click", function() {
            activeCategory = this.getAttribute("data-agent-category");
            refreshActivePage();
          });
        });
        document.querySelectorAll("[data-agent-id]:not(:disabled)").forEach((button) => {
          button.addEventListener("click", function() {
            navigateTo("p11", { agentId: this.getAttribute("data-agent-id") });
          });
        });
        document.getElementById("p11Energy").addEventListener("click", () => toast("\u5F53\u524D\u53EF\u7528\u80FD\u91CF " + walletBalance.toFixed(1) + " \u70B9"));
        return;
      }
      const agent = getAgent(params.agentId);
      const session = getSession(agent);
      document.getElementById("p11Clear").addEventListener("click", () => showModal({
        title: "\u6E05\u7A7A\u5F53\u524D\u5BF9\u8BDD\uFF1F",
        body: "\u53EA\u4F1A\u6E05\u7A7A\u5F53\u524D\u667A\u80FD\u4F53\u7684\u4F1A\u8BDD\uFF0C\u5176\u4ED6\u667A\u80FD\u4F53\u7684\u5BF9\u8BDD\u4E0D\u53D7\u5F71\u54CD\u3002",
        confirmText: "\u6E05\u7A7A",
        danger: true,
        onConfirm() {
          sessions.delete(agent.id);
          refreshActivePage();
        }
      }));
      const humanMatch = document.getElementById("p11HumanMatch");
      if (humanMatch) humanMatch.addEventListener("click", () => navigateTo("p5", {
        sku: agent.humanSku,
        categoryId: agent.humanCategoryId,
        source: "agent",
        agentId: agent.id
      }));
      if (agent.status === "paused") return;
      const input = document.getElementById("p11Input");
      document.querySelectorAll("[data-agent-prompt]").forEach((button) => {
        button.addEventListener("click", function() {
          input.value = this.getAttribute("data-agent-prompt");
          input.focus();
        });
      });
      document.getElementById("p11Attach").addEventListener("click", () => requestFileConsent(agent));
      document.getElementById("p11Send").addEventListener("click", () => {
        const text = input.value.trim();
        if (!text || session.typing) return;
        if (walletBalance < agent.unitCost) {
          toast("\u80FD\u91CF\u70B9\u4F59\u989D\u4E0D\u8DB3");
          return;
        }
        session.messages.push({ role: "user", content: text });
        session.typing = true;
        refreshActivePage();
        setTimeout(() => {
          session.typing = false;
          if (text.includes("\u6A21\u62DF\u5931\u8D25")) {
            session.messages.push({ role: "agent", content: "\u672C\u6B21\u8C03\u7528\u6CA1\u6709\u83B7\u5F97\u6709\u6548\u56DE\u590D\uFF0C\u672A\u6263\u9664\u80FD\u91CF\u70B9\u3002\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002" });
          } else {
            session.messages.push({ role: "agent", content: replyFor(agent) });
            walletBalance = Math.max(0, walletBalance - agent.unitCost);
          }
          if (document.getElementById("page-container")?.getAttribute("data-page") === "p11") refreshActivePage();
        }, 900);
      });
      requestAnimationFrame(() => {
        const messages = document.getElementById("p11Messages");
        if (messages) messages.scrollIntoView({ block: "end" });
      });
    }
  };
  register("p11", page11);

  // src/pages/p12-fundraising/index.js
  var steps2 = [
    { id: "confirm", name: "\u786E\u8BA4\u8D44\u6599" },
    { id: "preview", name: "\u8131\u654F\u9884\u89C8" },
    { id: "authorize", name: "\u6388\u6743\u5339\u914D" }
  ];
  var investors = [
    {
      id: "i001",
      name: "\u738B\u5148\u751F",
      role: "\u4E2A\u4EBA\u6295\u8D44\u4EBA \xB7 \u524D\u4EA7\u4E1A\u57FA\u91D1\u6295\u8D44\u8D1F\u8D23\u4EBA",
      verified: true,
      focus: "\u4F01\u4E1A\u670D\u52A1\u3001AI \u5E94\u7528",
      stage: "\u5929\u4F7F\u8F6E\u81F3 Pre-A \u8F6E",
      ticket: "500\u20132000 \u4E07\u5143",
      region: "\u5317\u4EAC\u3001\u4E0A\u6D77\u3001\u6DF1\u5733",
      summary: "\u5173\u6CE8 AI \u5728\u4F01\u4E1A\u670D\u52A1\u573A\u666F\u4E2D\u7684\u843D\u5730\uFF0C\u504F\u597D\u5DF2\u6709\u4ED8\u8D39\u9A8C\u8BC1\u3001\u56E2\u961F\u5177\u5907\u884C\u4E1A\u7ECF\u9A8C\u7684\u9879\u76EE\u3002",
      reasons: ["\u5173\u6CE8\u4F01\u4E1A\u670D\u52A1\u4E0E AI \u5E94\u7528\uFF0C\u548C\u9879\u76EE\u8D5B\u9053\u4E00\u81F4", "\u504F\u597D Pre-A \u9636\u6BB5\uFF0C\u8986\u76D6\u672C\u8F6E\u878D\u8D44\u9636\u6BB5", "\u5355\u7B14\u51FA\u624B\u533A\u95F4\u8986\u76D6\u672C\u8F6E\u878D\u8D44\u89C4\u6A21"],
      accessStatus: "\u5B8C\u6574 BP \u5DF2\u67E5\u770B \xB7 09-03 11:12",
      requestAt: "09-03 13:36",
      requestMessage: "\u9879\u76EE\u65B9\u5411\u4E0E\u6211\u5173\u6CE8\u7684\u4F01\u4E1A\u670D\u52A1\u8D5B\u9053\u5951\u5408\uFF0C\u5E0C\u671B\u8FDB\u4E00\u6B65\u4E86\u89E3\u4EA7\u54C1\u7559\u5B58\u548C\u672C\u8F6E\u8D44\u91D1\u4F7F\u7528\u8BA1\u5212\u3002"
    },
    {
      id: "i002",
      name: "\u9648\u5973\u58EB",
      role: "\u4E2A\u4EBA\u6295\u8D44\u4EBA \xB7 \u8FDE\u7EED\u521B\u4E1A\u8005",
      verified: true,
      focus: "\u534F\u4F5C\u5DE5\u5177\u3001\u6548\u7387\u8F6F\u4EF6",
      stage: "\u79CD\u5B50\u8F6E\u81F3 A \u8F6E",
      ticket: "300\u20131500 \u4E07\u5143",
      region: "\u5168\u56FD",
      summary: "\u957F\u671F\u5173\u6CE8\u534F\u4F5C\u5DE5\u5177\u4E0E\u6548\u7387\u8F6F\u4EF6\uFF0C\u91CD\u89C6\u4EA7\u54C1\u7559\u5B58\u548C\u521B\u59CB\u56E2\u961F\u7684\u6267\u884C\u901F\u5EA6\u3002",
      reasons: ["\u6295\u8D44\u65B9\u5411\u8986\u76D6\u534F\u4F5C\u5DE5\u5177\u4E0E\u6548\u7387\u8F6F\u4EF6", "\u9879\u76EE\u9636\u6BB5\u5904\u4E8E\u5176\u5E38\u89C1\u51FA\u624B\u8303\u56F4", "\u4EA7\u54C1\u5DF2\u6709\u521D\u6B65\u5546\u4E1A\u9A8C\u8BC1"],
      accessStatus: "\u5B8C\u6574 BP \u5DF2\u67E5\u770B \xB7 09-03 11:40",
      requestAt: "09-03 12:10",
      requestMessage: "\u5E0C\u671B\u8FDB\u4E00\u6B65\u4E86\u89E3\u4EA7\u54C1\u7559\u5B58\u3001\u7EED\u8D39\u60C5\u51B5\u548C\u672A\u6765\u5341\u4E8C\u4E2A\u6708\u7684\u9500\u552E\u8BA1\u5212\u3002"
    },
    {
      id: "i003",
      name: "\u5218\u5148\u751F",
      role: "\u4E2A\u4EBA\u6295\u8D44\u4EBA \xB7 \u4F01\u4E1A\u8F6F\u4EF6\u521B\u4E1A\u8005",
      verified: true,
      focus: "\u4F01\u4E1A\u8F6F\u4EF6\u3001\u77E5\u8BC6\u7BA1\u7406",
      stage: "Pre-A \u8F6E\u81F3 A \u8F6E",
      ticket: "800\u20132500 \u4E07\u5143",
      region: "\u5317\u4EAC\u3001\u676D\u5DDE",
      summary: "\u6709\u4F01\u4E1A\u8F6F\u4EF6\u521B\u4E1A\u4E0E\u6295\u8D44\u7ECF\u5386\uFF0C\u5173\u6CE8\u4EA7\u54C1\u5546\u4E1A\u5316\u6548\u7387\u548C\u56E2\u961F\u7684\u884C\u4E1A\u7406\u89E3\u3002",
      reasons: ["\u4F01\u4E1A\u8F6F\u4EF6\u7ECF\u9A8C\u4E0E\u9879\u76EE\u5E94\u7528\u573A\u666F\u76F8\u5173", "\u51FA\u624B\u9636\u6BB5\u8986\u76D6\u672C\u8F6E\u878D\u8D44\u8F6E\u6B21", "\u5173\u6CE8\u5317\u4EAC\u53CA\u6838\u5FC3\u57CE\u5E02\u9879\u76EE"],
      accessStatus: "\u5B8C\u6574 BP \u5DF2\u67E5\u770B \xB7 09-02 15:50",
      requestAt: "09-02 16:20",
      requestMessage: "\u9879\u76EE\u4E0E\u6211\u7684\u4F01\u4E1A\u8F6F\u4EF6\u7ECF\u9A8C\u76F8\u5173\uFF0C\u5E0C\u671B\u548C\u56E2\u961F\u8FDB\u4E00\u6B65\u4EA4\u6D41\u5546\u4E1A\u5316\u8DEF\u5F84\u3002"
    },
    {
      id: "i004",
      name: "\u5468\u5973\u58EB",
      role: "\u4E2A\u4EBA\u6295\u8D44\u4EBA \xB7 \u79D1\u6280\u884C\u4E1A\u987E\u95EE",
      verified: true,
      focus: "AI \u5E94\u7528\u3001\u751F\u4EA7\u529B\u5DE5\u5177",
      stage: "\u5929\u4F7F\u8F6E\u81F3 Pre-A \u8F6E",
      ticket: "300\u20131200 \u4E07\u5143",
      region: "\u5168\u56FD",
      summary: "\u5173\u6CE8\u53EF\u5FEB\u901F\u9A8C\u8BC1\u4EF7\u503C\u7684 AI \u5E94\u7528\uFF0C\u504F\u597D\u6709\u660E\u786E\u4ED8\u8D39\u573A\u666F\u548C\u590D\u8D2D\u8DEF\u5F84\u7684\u56E2\u961F\u3002",
      reasons: ["AI \u5E94\u7528\u65B9\u5411\u4E0E\u9879\u76EE\u6807\u7B7E\u4E00\u81F4", "\u9636\u6BB5\u504F\u597D\u8986\u76D6\u672C\u8F6E\u878D\u8D44", "\u5173\u6CE8\u5DF2\u6709\u4ED8\u8D39\u9A8C\u8BC1\u7684\u4EA7\u54C1"],
      accessStatus: "\u5B8C\u6574 BP \u5DF2\u67E5\u770B \xB7 09-02 13:40",
      requestAt: "09-02 14:12",
      requestMessage: "\u66FE\u5E0C\u671B\u4E86\u89E3\u4ED8\u8D39\u5BA2\u6237\u7ED3\u6784\uFF0C\u540E\u7EED\u56E0\u6295\u8D44\u8282\u594F\u8C03\u6574\u64A4\u56DE\u4E86\u5EFA\u8054\u7533\u8BF7\u3002"
    },
    {
      id: "i005",
      name: "\u8D75\u5148\u751F",
      role: "\u4E2A\u4EBA\u6295\u8D44\u4EBA \xB7 \u524D SaaS \u516C\u53F8\u9AD8\u7BA1",
      verified: true,
      focus: "SaaS\u3001\u534F\u4F5C\u5E73\u53F0",
      stage: "Pre-A \u8F6E\u81F3 A \u8F6E",
      ticket: "500\u20131800 \u4E07\u5143",
      region: "\u5317\u4EAC\u3001\u4E0A\u6D77",
      summary: "\u504F\u597D\u5177\u5907\u6301\u7EED\u6536\u5165\u548C\u6E05\u6670\u5BA2\u6237\u753B\u50CF\u7684 SaaS \u9879\u76EE\uFF0C\u4E5F\u5173\u6CE8 AI \u5E26\u6765\u7684\u4EA7\u54C1\u6548\u7387\u63D0\u5347\u3002",
      reasons: ["SaaS \u4E0E\u534F\u4F5C\u5E73\u53F0\u65B9\u5411\u9AD8\u5EA6\u76F8\u5173", "\u5730\u57DF\u504F\u597D\u8986\u76D6\u9879\u76EE\u6240\u5728\u5730", "\u51FA\u624B\u533A\u95F4\u8986\u76D6\u672C\u8F6E\u9700\u6C42"],
      accessStatus: "\u5B8C\u6574 BP \u5DF2\u67E5\u770B \xB7 08-30 09:40",
      requestAt: "08-30 10:15",
      requestMessage: "\u5E0C\u671B\u4EA4\u6D41\u672C\u8F6E\u878D\u8D44\u5B89\u6392\uFF0C\u672C\u6B21\u7533\u8BF7\u56E0\u8D85\u8FC7\u5904\u7406\u65F6\u9650\u81EA\u52A8\u5173\u95ED\u3002"
    }
  ];
  var investorBatches = [investors.slice(0, 3), investors.slice(3, 5)];
  function header(title) {
    return '<div class="nav-bar"><button class="nav-back" id="p12Back" type="button" aria-label="\u8FD4\u56DE">' + icon("chevron-left", 22) + '</button><div class="nav-title">' + title + '</div><div class="nav-action"></div></div>';
  }
  function progress(stage) {
    const active = Math.max(0, steps2.findIndex((step) => step.id === stage));
    return '<ol class="p12-stepper" aria-label="\u878D\u8D44\u5339\u914D\u6B65\u9AA4">' + steps2.map((step, index) => '<li class="' + (index < active ? "done" : index === active ? "active" : "") + '"><span>' + (index < active ? icon("check", 13) : index + 1) + "</span><small>" + step.name + "</small></li>").join("") + "</ol>";
  }
  function introView(state2) {
    return '<div class="p12-page">' + header("\u6295\u878D\u8D44\u670D\u52A1") + '<section class="p12-intro"><span class="p12-intro-visual">' + icon("trending-up", 31) + '</span><h1>\u8BA9\u5408\u9002\u7684\u6295\u8D44\u4EBA\u770B\u89C1\u4F60\u7684\u9879\u76EE</h1><p>\u5E73\u53F0\u5C06\u7ED3\u5408\u9879\u76EE\u9636\u6BB5\u3001\u884C\u4E1A\u65B9\u5411\u548C\u878D\u8D44\u9700\u6C42\uFF0C\u5339\u914D\u6295\u8D44\u504F\u597D\u5951\u5408\u7684\u6295\u8D44\u4EBA\u3002</p><div class="p12-intro-flow"><span>\u51C6\u5907 BP</span><i></i><span>\u786E\u8BA4\u6388\u6743</span><i></i><span>\u7B49\u5F85\u5339\u914D</span></div></section><section class="p12-source"><div class="p12-section-title"><h2>\u5DF2\u53D1\u73B0\u4E00\u4EFD\u5546\u4E1A\u8BA1\u5212\u4E66</h2><span>\u6765\u81EA\u5E73\u53F0\u8D44\u6599\u5E93</span></div><div class="p12-file"><span>' + icon("file-text", 22) + "</span><div><strong>" + escapeHTML(state2.bpName) + "</strong><small>\u66F4\u65B0\u4E8E " + state2.bpUpdatedAt + ' \xB7 28 \u9875</small></div><button id="p12PreviewFile" type="button">\u9884\u89C8</button></div><button class="btn btn-primary btn-block p12-primary" id="p12UseBp" type="button">\u4F7F\u7528\u8FD9\u4EFD BP</button><button class="p12-text-action" id="p12Upload" type="button">\u91CD\u65B0\u4E0A\u4F20 BP</button></section><div class="p12-privacy-note">' + icon("shield", 18) + "<span><strong>\u8D44\u6599\u5C06\u5148\u8131\u654F</strong><small>\u5B8C\u6574\u8D44\u6599\u53EA\u5411\u5B8C\u6210\u8EAB\u4EFD\u6838\u9A8C\u3001\u7B26\u5408\u5339\u914D\u6761\u4EF6\u5E76\u4E3B\u52A8\u7533\u8BF7\u67E5\u770B\u7684\u6295\u8D44\u4EBA\u5F00\u653E\u3002</small></span></div></div>";
  }
  function confirmView(state2) {
    const project = state2.project;
    return '<div class="p12-page">' + header("\u786E\u8BA4\u9879\u76EE\u4FE1\u606F") + progress("confirm") + '<section class="p12-form"><div class="p12-form-intro"><h1>\u6211\u4EEC\u4ECE BP \u4E2D\u63D0\u53D6\u4E86\u8FD9\u4E9B\u4FE1\u606F</h1><p>\u8BF7\u786E\u8BA4\u540E\u518D\u8FDB\u5165\u8131\u654F\u9884\u89C8\uFF0C\u4F60\u53EF\u4EE5\u76F4\u63A5\u4FEE\u6539\u8BC6\u522B\u7ED3\u679C\u3002</p></div><label><span>\u884C\u4E1A\u65B9\u5411</span><input id="p12Industry" value="' + escapeHTML(project.industry) + '"></label><div class="p12-form-grid"><label><span>\u6240\u5728\u5730\u533A</span><input id="p12Region" value="' + escapeHTML(project.region) + '"></label><label><span>\u9879\u76EE\u9636\u6BB5</span><input id="p12Stage" value="' + escapeHTML(project.stage) + '"></label></div><div class="p12-form-grid"><label><span>\u878D\u8D44\u8F6E\u6B21</span><input id="p12Round" value="' + escapeHTML(project.round) + '"></label><label><span>\u878D\u8D44\u89C4\u6A21</span><input id="p12Amount" value="' + escapeHTML(project.amount) + '"></label></div><label><span>\u8D44\u91D1\u7528\u9014</span><textarea id="p12Use" rows="3">' + escapeHTML(project.useOfFunds) + '</textarea></label></section><div class="bottom-bar p12-bottom"><button class="btn btn-primary btn-block" id="p12ConfirmInfo" type="button">\u786E\u8BA4\u5E76\u67E5\u770B\u8131\u654F\u6548\u679C</button></div></div>';
  }
  function previewView(state2) {
    return '<div class="p12-page">' + header("\u8D44\u6599\u8131\u654F\u9884\u89C8") + progress("preview") + '<section class="p12-preview-head"><h1>\u6295\u8D44\u4EBA\u9996\u6B21\u770B\u5230\u7684\u9879\u76EE\u8D44\u6599</h1><p>\u4EE5\u4E0B\u5185\u5BB9\u7528\u4E8E\u521D\u6B65\u5224\u65AD\u662F\u5426\u5951\u5408\uFF0C\u4E0D\u5305\u542B\u53EF\u76F4\u63A5\u8BC6\u522B\u9879\u76EE\u548C\u56E2\u961F\u7684\u4FE1\u606F\u3002</p></section><article class="p12-project-preview"><div class="p12-project-code"><span>' + icon("lock", 18) + '</span><div><small>\u9879\u76EE\u7F16\u53F7</small><strong>AI-260903-07</strong></div><b>\u5DF2\u8131\u654F</b></div><h2>\u4F01\u4E1A\u670D\u52A1\u9886\u57DF AI \u534F\u4F5C\u5DE5\u5177</h2><div class="p12-preview-tags"><span>' + escapeHTML(state2.project.stage) + "</span><span>" + escapeHTML(state2.project.region) + "</span><span>" + escapeHTML(state2.project.amount) + '</span></div><dl><div><dt>\u9879\u76EE\u6982\u51B5</dt><dd>\u9762\u5411\u6210\u957F\u578B\u4F01\u4E1A\u63D0\u4F9B AI \u9A71\u52A8\u7684\u534F\u4F5C\u4E0E\u77E5\u8BC6\u7BA1\u7406\u5DE5\u5177\uFF0C\u5DF2\u5B8C\u6210\u4EA7\u54C1\u9A8C\u8BC1\u5E76\u5F62\u6210\u4ED8\u8D39\u6536\u5165\u3002</dd></div><div><dt>\u56E2\u961F\u6982\u51B5</dt><dd>\u6838\u5FC3\u56E2\u961F\u5177\u5907\u4F01\u4E1A\u8F6F\u4EF6\u4E0E\u4EBA\u5DE5\u667A\u80FD\u4EA7\u54C1\u7ECF\u9A8C\uFF0C\u6210\u5458\u6765\u81EA\u5934\u90E8\u79D1\u6280\u4F01\u4E1A\u3002</dd></div><div><dt>\u7ECF\u8425\u8868\u73B0</dt><dd>\u8FD1\u4E00\u5E74\u6536\u5165\u5904\u4E8E\u6570\u767E\u4E07\u5143\u533A\u95F4\uFF0C\u5BA2\u6237\u7EED\u8D39\u4E0E\u6D3B\u8DC3\u5EA6\u4FDD\u6301\u589E\u957F\u3002</dd></div></dl></article><section class="p12-hidden-list"><h2>\u5E73\u53F0\u5DF2\u9690\u85CF</h2><div><span>' + icon("eye-off", 16) + "\u516C\u53F8\u5168\u79F0\u4E0E\u54C1\u724C</span><span>" + icon("eye-off", 16) + "\u521B\u59CB\u4EBA\u59D3\u540D\u4E0E\u8054\u7CFB\u65B9\u5F0F</span><span>" + icon("eye-off", 16) + "\u5BA2\u6237\u53CA\u5408\u4F5C\u65B9\u540D\u79F0</span><span>" + icon("eye-off", 16) + '\u7CBE\u786E\u8D22\u52A1\u4E0E\u80A1\u6743\u4FE1\u606F</span></div></section><div class="bottom-bar p12-bottom"><button class="btn btn-primary btn-block" id="p12AcceptPreview" type="button">\u786E\u8BA4\u8131\u654F\u5185\u5BB9</button></div></div>';
  }
  function authorizeView(state2) {
    return '<div class="p12-page">' + header("\u6388\u6743\u878D\u8D44\u5339\u914D") + progress("authorize") + '<section class="p12-auth"><h1>\u4E00\u6B21\u6388\u6743\uFF0C\u8986\u76D6\u672C\u8F6E\u878D\u8D44\u5339\u914D</h1><p>\u65E0\u9700\u9010\u4F4D\u5BA1\u6279\u5B8C\u6574 BP \u67E5\u770B\u6743\u9650\u3002\u6BCF\u6B21\u8D44\u6599\u5F00\u653E\u524D\uFF0C\u5E73\u53F0\u90FD\u4F1A\u81EA\u52A8\u6838\u9A8C\u4EE5\u4E0B\u6761\u4EF6\uFF0C\u5E76\u751F\u6210\u9762\u5411\u8BE5\u6295\u8D44\u4EBA\u7684\u8BBF\u95EE\u8BB0\u5F55\u3002</p><ul><li>' + icon("check-circle", 18) + "<span><strong>\u6295\u8D44\u4EBA\u8EAB\u4EFD\u5DF2\u6838\u9A8C</strong><small>\u5E73\u53F0\u5DF2\u5B8C\u6210\u4E2A\u4EBA\u8EAB\u4EFD\u4E0E\u6295\u8D44\u7ECF\u5386\u6838\u9A8C</small></span></li><li>" + icon("check-circle", 18) + "<span><strong>\u6295\u8D44\u504F\u597D\u4E0E\u9879\u76EE\u5951\u5408</strong><small>\u884C\u4E1A\u3001\u9636\u6BB5\u4E0E\u51FA\u624B\u533A\u95F4\u7B26\u5408\u672C\u8F6E\u5339\u914D\u6761\u4EF6</small></span></li><li>" + icon("check-circle", 18) + '<span><strong>\u5DF2\u7B7E\u7F72\u4FDD\u5BC6\u627F\u8BFA</strong><small>\u6295\u8D44\u4EBA\u4E3B\u52A8\u7533\u8BF7\u67E5\u770B\uFF0C\u8D44\u6599\u91C7\u7528\u53D7\u63A7\u8BBF\u95EE\u548C\u52A8\u6001\u6C34\u5370</small></span></li></ul><div class="p12-version-rule">' + icon("refresh", 18) + '<span><strong>\u6295\u8D44\u4EBA\u59CB\u7EC8\u67E5\u770B\u6700\u65B0\u7248 BP</strong><small>\u4F60\u66F4\u65B0\u8D44\u6599\u540E\uFF0C\u5DF2\u83B7\u6743\u9650\u7684\u6295\u8D44\u4EBA\u4F1A\u770B\u5230\u65B0\u7248\u672C\uFF1B\u5386\u53F2\u7248\u672C\u4EC5\u4FDD\u7559\u5728\u5E73\u53F0\u5BA1\u8BA1\u8BB0\u5F55\u4E2D\u3002</small></span></div><label class="p12-exclusion"><span>\u6392\u9664\u5BF9\u8C61\uFF08\u9009\u586B\uFF09</span><textarea id="p12Exclusion" rows="3" placeholder="\u53EF\u586B\u5199\u4E0D\u5E0C\u671B\u89E6\u8FBE\u7684\u4E2A\u4EBA\u3001\u673A\u6784\u6216\u7ADE\u4E89\u5BF9\u624B">' + escapeHTML(state2.excluded) + '</textarea></label><label class="p12-consent"><input type="checkbox" id="p12Consent"><span>\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F\uFF1A\u6388\u6743\u5E73\u53F0\u5728\u672C\u8F6E\u878D\u8D44\u5339\u914D\u671F\u95F4\uFF0C\u6309\u8EAB\u4EFD\u3001\u5339\u914D\u6761\u4EF6\u3001\u67E5\u770B\u610F\u613F\u548C\u4FDD\u5BC6\u72B6\u6001\u81EA\u52A8\u5224\u65AD\u8D44\u6599\u8BBF\u95EE\u6743\u9650\u3002</span></label><button class="p12-agreement" id="p12Agreement" type="button">\u67E5\u770B\u300A\u878D\u8D44\u5339\u914D\u4FDD\u5BC6\u4E0E\u6388\u6743\u534F\u8BAE\u300B' + icon("chevron-right", 14) + '</button></section><div class="bottom-bar p12-bottom"><button class="btn btn-primary btn-block" id="p12Submit" type="button" disabled>\u7B7E\u7F72\u5E76\u5F00\u59CB\u5339\u914D</button></div></div>';
  }
  function matchingView() {
    return '<div class="p12-page p12-matching-page">' + header("\u878D\u8D44\u5339\u914D") + '<section class="p12-matching"><div class="p12-orbit" aria-hidden="true"><span></span><i></i><b></b>' + icon("trending-up", 29) + '</div><h1>\u6B63\u5728\u5EFA\u7ACB\u5339\u914D\u6761\u4EF6</h1><p>\u6839\u636E\u9879\u76EE\u6807\u7B7E\u6838\u5BF9\u6295\u8D44\u4EBA\u7684\u5173\u6CE8\u65B9\u5411\u3001\u9636\u6BB5\u504F\u597D\u548C\u51FA\u624B\u533A\u95F4\u3002</p><div class="p12-match-checks"><span class="active">' + icon("check", 15) + '\u89E3\u6790\u9879\u76EE\u6807\u7B7E</span><span class="active">' + icon("check", 15) + "\u7B5B\u9009\u5DF2\u6838\u9A8C\u6295\u8D44\u4EBA</span><span>\u6838\u5BF9\u6295\u8D44\u504F\u597D</span></div></section></div>";
  }
  function showMatchResultNotice() {
    const overlay = showSheet({
      title: "\u9996\u6279\u5339\u914D\u7ED3\u679C\u5DF2\u751F\u6210",
      body: '<div class="p12-result-arrival"><div class="p12-result-arrival-summary"><span>' + icon("trending-up", 23) + '</span><div><strong>\u5DF2\u627E\u5230 3 \u4F4D\u5951\u5408\u7684\u6295\u8D44\u4EBA</strong><small>\u4ED6\u4EEC\u5747\u5DF2\u53D1\u5E03\u6709\u6548\u7684\u201C\u6211\u8981\u627E\u9879\u76EE\u201D\u9700\u6C42\uFF0C\u5E76\u5B8C\u6210\u6295\u5411\u586B\u62A5\u3002</small></div></div><div class="p12-result-arrival-rule"><span>' + icon("shield", 16) + '</span><p>\u5E73\u53F0\u5C55\u793A\u5177\u4F53\u5339\u914D\u4F9D\u636E\uFF0C\u4E0D\u5C55\u793A\u5185\u90E8\u5339\u914D\u5206\u6570\u3002\u4F60\u53EF\u4EE5\u4E3B\u52A8\u7533\u8BF7\u5BF9\u63A5\uFF0C\u7531\u6295\u8D44\u4EBA\u9488\u5BF9\u9879\u76EE\u786E\u8BA4\u3002</p></div><div class="p12-result-arrival-actions"><button class="btn btn-outline" id="p12ResultLater" type="button">\u7A0D\u540E\u67E5\u770B</button><button class="btn btn-primary" id="p12ResultNow" type="button">\u67E5\u770B\u672C\u6279\u6295\u8D44\u4EBA</button></div></div>'
    });
    overlay.querySelector("#p12ResultLater").addEventListener("click", () => {
      overlay.remove();
      toast("\u7ED3\u679C\u5DF2\u4FDD\u7559\uFF0C\u53EF\u968F\u65F6\u4ECE\u878D\u8D44\u8FDB\u5EA6\u67E5\u770B");
    });
    overlay.querySelector("#p12ResultNow").addEventListener("click", () => {
      overlay.remove();
      navigateTo("p12", { stage: "results" });
    });
  }
  function requestInvestorConnection(investor) {
    showModal({
      title: "\u5411" + escapeHTML(investor.name) + "\u7533\u8BF7\u5BF9\u63A5\uFF1F",
      body: "\u5E73\u53F0\u4F1A\u628A\u4F60\u7684\u8131\u654F\u9879\u76EE\u6458\u8981\u53D1\u9001\u7ED9\u8BE5\u6295\u8D44\u4EBA\u3002\u6295\u8D44\u4EBA\u9488\u5BF9\u9879\u76EE\u786E\u8BA4\u540E\uFF0C\u518D\u7531\u5E73\u53F0\u534F\u52A9\u53CC\u65B9\u5EFA\u8054\u3002",
      cancelText: "\u518D\u770B\u770B",
      confirmText: "\u53D1\u9001\u5BF9\u63A5\u7533\u8BF7",
      onConfirm() {
        updateInvestorConnection(investor.id, { status: "entrepreneur_requested", initiator: "entrepreneur", requestedAt: "\u521A\u521A" });
        updateFundraisingState({ connectionInvestorId: investor.id });
        refreshActivePage();
        toast("\u5BF9\u63A5\u7533\u8BF7\u5DF2\u53D1\u9001\uFF0C\u7B49\u5F85\u6295\u8D44\u4EBA\u786E\u8BA4");
      }
    });
  }
  function showMutualConnectionNotice(investor) {
    const overlay = showSheet({
      title: "\u6295\u8D44\u4EBA\u5DF2\u540C\u610F\u5BF9\u63A5",
      body: '<div class="p12-mutual-notice"><div><span>' + icon("check-circle", 23) + "</span><div><strong>" + escapeHTML(investor.name) + '\u613F\u610F\u8FDB\u4E00\u6B65\u4EA4\u6D41</strong><small>\u53CC\u65B9\u610F\u5411\u5DF2\u786E\u8BA4\u3002\u4E0B\u4E00\u6B65\u6DFB\u52A0\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1\uFF0C\u7531\u987E\u95EE\u9080\u8BF7\u53CC\u65B9\u8FDB\u5165\u540C\u4E00\u4E2A\u7FA4\u3002</small></div></div><div class="p12-result-arrival-actions"><button class="btn btn-outline" id="p12ConnectLater" type="button">\u7A0D\u540E\u5904\u7406</button><button class="btn btn-primary" id="p12ConnectNow" type="button">\u7EE7\u7EED\u5B8C\u6210\u5EFA\u8054</button></div></div>'
    });
    overlay.querySelector("#p12ConnectLater").addEventListener("click", () => {
      overlay.remove();
      toast("\u53EF\u968F\u65F6\u4ECE\u878D\u8D44\u5339\u914D\u7ED3\u679C\u7EE7\u7EED\u5EFA\u8054");
    });
    overlay.querySelector("#p12ConnectNow").addEventListener("click", () => {
      overlay.remove();
      updateFundraisingState({ connectionInvestorId: investor.id });
      navigateTo("p12", { stage: "connection" });
    });
  }
  function scheduleDemoInvestorConfirmation() {
    const pending = Object.entries(getFundraisingState().investorConnections || {}).find((entry) => entry[1].status === "entrepreneur_requested");
    if (!pending) return;
    const investorId = pending[0];
    setTimeout(() => {
      const current = getFundraisingState();
      if (current.investorConnections?.[investorId]?.status !== "entrepreneur_requested") return;
      updateInvestorConnection(investorId, { status: "confirmed", confirmedAt: "\u521A\u521A" });
      updateFundraisingState({ connectionInvestorId: investorId, connectionNoticeInvestorId: investorId });
      if (document.getElementById("page-container")?.getAttribute("data-page") === "p12") refreshActivePage();
    }, 2200);
  }
  function scheduleDemoMatchResult() {
    setTimeout(() => {
      if (document.getElementById("page-container")?.getAttribute("data-page") !== "p12") return;
      const current = getFundraisingState();
      if (current.status !== "waiting" || current.paused) return;
      makeFundraisingResultsAvailable();
      refreshActivePage();
    }, 2200);
  }
  function progressCopy(state2) {
    if (state2.paused) return { iconName: "pause", title: "\u672C\u8F6E\u5339\u914D\u5DF2\u6682\u505C", desc: "\u6062\u590D\u540E\uFF0C\u5E73\u53F0\u4F1A\u7EE7\u7EED\u6839\u636E\u5F53\u524D BP \u548C\u9879\u76EE\u6807\u7B7E\u8FDB\u884C\u5339\u914D\u3002", action: "" };
    const counts = getConnectionCounts();
    if (counts.requested) return { iconName: "bell", title: counts.requested + " \u6761\u5EFA\u8054\u7533\u8BF7\u5F85\u5904\u7406", desc: "\u6BCF\u4F4D\u6295\u8D44\u4EBA\u7684\u7533\u8BF7\u72EC\u7ACB\u5904\u7406\uFF0C\u4F60\u53EF\u4EE5\u5206\u522B\u540C\u610F\u6216\u6682\u4E0D\u5EFA\u8054\u3002", action: "\u67E5\u770B\u5E76\u5904\u7406" };
    if (counts.entrepreneur_requested) return { iconName: "clock", title: counts.entrepreneur_requested + " \u6761\u5BF9\u63A5\u7533\u8BF7\u7B49\u5F85\u786E\u8BA4", desc: "\u9879\u76EE\u6458\u8981\u5DF2\u53D1\u9001\u7ED9\u6295\u8D44\u4EBA\uFF0C\u5BF9\u65B9\u786E\u8BA4\u540E\u4F1A\u53CA\u65F6\u901A\u77E5\u4F60\u3002", action: "\u67E5\u770B\u7533\u8BF7" };
    if (counts.confirmed) return { iconName: "message", title: counts.confirmed + " \u6761\u5EFA\u8054\u5F85\u7EE7\u7EED", desc: "\u6DFB\u52A0\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1\u540E\uFF0C\u5E73\u53F0\u987E\u95EE\u4F1A\u5206\u522B\u534F\u52A9\u521B\u5EFA\u6C9F\u901A\u7FA4\u3002", action: "\u67E5\u770B\u5EFA\u8054\u8FDB\u5EA6" };
    if (counts.connecting) return { iconName: "message", title: counts.connecting + " \u4F4D\u6295\u8D44\u4EBA\u5EFA\u8054\u4E2D", desc: "\u5E73\u53F0\u987E\u95EE\u6B63\u5728\u5904\u7406\u62C9\u7FA4\uFF0C\u5176\u4ED6\u5339\u914D\u7ED3\u679C\u4ECD\u53EF\u72EC\u7ACB\u67E5\u770B\u3002", action: "\u67E5\u770B\u5EFA\u8054\u8FDB\u5EA6" };
    if (counts.connected) return { iconName: "check-circle", title: "\u5DF2\u5B8C\u6210 " + counts.connected + " \u4F4D\u6295\u8D44\u4EBA\u5EFA\u8054", desc: "\u672C\u8F6E\u5339\u914D\u7EE7\u7EED\u8FDB\u884C\uFF0C\u65B0\u7684\u67E5\u770B\u4E0E\u5EFA\u8054\u7533\u8BF7\u4F1A\u5355\u72EC\u901A\u77E5\u3002", action: "\u67E5\u770B\u5168\u90E8\u7ED3\u679C" };
    if (state2.status === "matched") return { iconName: "bell", title: "\u5DF2\u6709\u65B0\u7684\u5339\u914D\u7ED3\u679C", desc: "\u672C\u6279\u63A8\u8350\u5DF2\u51C6\u5907\u597D\uFF0C\u53EF\u67E5\u770B\u6295\u8D44\u504F\u597D\u548C\u5177\u4F53\u5339\u914D\u4F9D\u636E\u3002", action: "\u67E5\u770B\u5339\u914D\u7ED3\u679C" };
    return { iconName: "clock", title: "\u6B63\u5728\u4E3A\u4F60\u5BFB\u627E\u5408\u9002\u7684\u6295\u8D44\u4EBA", desc: "\u627E\u6295\u8D44\u4EBA\u901A\u5E38\u9700\u8981\u4E00\u4E9B\u65F6\u95F4\u3002\u4F60\u53EF\u4EE5\u5148\u79BB\u5F00\uFF0C\u6709\u8FDB\u5C55\u65F6\u6211\u4EEC\u4F1A\u901A\u77E5\u4F60\u3002", action: "" };
  }
  function timelineView(state2) {
    const counts = getConnectionCounts();
    const connectionTotal = Object.values(counts).reduce((sum, value) => sum + value, 0);
    const matched = state2.status === "matched" || connectionTotal > 0;
    const hasIntent = counts.requested + counts.entrepreneur_requested + counts.confirmed + counts.connecting + counts.connected + counts.declined + counts.withdrawn + counts.expired > 0;
    const hasConnection = counts.confirmed + counts.connecting + counts.connected > 0;
    const node = (done, active, title, detail) => '<div class="' + (done ? "done" : active ? "active" : "") + '"><span>' + (done ? icon("check", 13) : "") + "</span><div><strong>" + title + "</strong><small>" + detail + "</small></div></div>";
    return '<div class="p12-timeline">' + node(true, false, "BP\u3001\u8131\u654F\u5185\u5BB9\u4E0E\u6388\u6743\u5DF2\u786E\u8BA4", state2.submittedAt || "09-03 10:20") + node(matched, !matched && !state2.paused, matched ? "\u5DF2\u751F\u6210\u672C\u6279\u5339\u914D\u7ED3\u679C" : state2.paused ? "\u5339\u914D\u5DF2\u6682\u505C" : "\u6301\u7EED\u6838\u5BF9\u6295\u8D44\u504F\u597D", matched ? "\u4EC5\u5C55\u793A\u7B26\u5408\u6761\u4EF6\u7684\u63A8\u8350\u7ED3\u679C" : "\u7ED3\u679C\u4F1A\u6839\u636E\u6295\u8D44\u4EBA\u9700\u6C42\u6301\u7EED\u66F4\u65B0") + node(hasIntent, matched && !hasIntent, hasIntent ? "\u53CC\u65B9\u5BF9\u63A5\u610F\u5411\u6301\u7EED\u66F4\u65B0" : "\u53EF\u5411\u63A8\u8350\u6295\u8D44\u4EBA\u7533\u8BF7\u5BF9\u63A5", hasIntent ? "\u53CC\u65B9\u53D1\u8D77\u3001\u786E\u8BA4\u3001\u64A4\u56DE\u548C\u8D85\u65F6\u5747\u72EC\u7ACB\u8BB0\u5F55" : "\u5E73\u53F0\u5148\u53D1\u9001\u8131\u654F\u9879\u76EE\u6458\u8981\uFF0C\u7531\u6295\u8D44\u4EBA\u786E\u8BA4") + node(hasConnection, hasIntent && !hasConnection, hasConnection ? "\u5E73\u53F0\u6309\u786E\u8BA4\u7ED3\u679C\u5206\u522B\u534F\u52A9\u5EFA\u8054" : "\u53CC\u65B9\u786E\u8BA4\u540E\u7531\u5E73\u53F0\u534F\u52A9\u5EFA\u8054", hasConnection ? "\u5DF2\u786E\u8BA4\u7684\u6C9F\u901A\u8F6C\u81F3\u4F01\u4E1A\u5FAE\u4FE1" : "\u5C0F\u7A0B\u5E8F\u5185\u4E0D\u5F00\u653E\u53CC\u65B9\u8054\u7CFB\u65B9\u5F0F") + "</div>";
  }
  function connectionOverview() {
    const counts = getConnectionCounts();
    const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
    if (!total) return "";
    const groups = [
      ["\u5F85\u6211\u5904\u7406", counts.requested, "pending"],
      ["\u7B49\u5F85\u6295\u8D44\u4EBA", counts.entrepreneur_requested, "waiting"],
      ["\u5EFA\u8054\u4E2D", counts.confirmed + counts.connecting, "working"],
      ["\u5DF2\u5EFA\u8054", counts.connected, "complete"]
    ];
    return '<section class="p12-connection-overview"><div><h2>\u6295\u8D44\u4EBA\u8FDB\u5C55</h2><button id="p12OverviewResults" type="button">\u67E5\u770B\u5168\u90E8</button></div><p>' + groups.map((item) => '<span class="' + item[2] + '"><strong>' + item[1] + "</strong><small>" + item[0] + "</small></span>").join("") + "</p></section>";
  }
  function progressView(state2) {
    const copy = progressCopy(state2);
    const counts = getConnectionCounts();
    const hasProgress = state2.status === "matched" || Object.values(counts).some(Boolean);
    const manageState = counts.entrepreneur_requested > 0 ? ["\u7B49\u5F85\u6295\u8D44\u4EBA\u786E\u8BA4", "\u9879\u76EE\u6458\u8981\u5DF2\u53D1\u9001\uFF0C\u786E\u8BA4\u7ED3\u679C\u4F1A\u53CA\u65F6\u901A\u77E5"] : counts.confirmed + counts.connecting > 0 ? ["\u6301\u7EED\u5339\u914D \xB7 \u5EFA\u8054\u5904\u7406\u4E2D", "\u5E73\u53F0\u6309\u6295\u8D44\u4EBA\u5206\u522B\u8BB0\u5F55\u548C\u534F\u52A9\u5EFA\u8054"] : counts.connected > 0 ? ["\u672C\u8F6E\u6301\u7EED\u5339\u914D", "\u5DF2\u6709\u5EFA\u8054\u5B8C\u6210\uFF0C\u4ECD\u53EF\u63A5\u6536\u65B0\u7ED3\u679C"] : state2.paused ? ["\u5DF2\u6682\u505C\u5339\u914D", "\u6062\u590D\u540E\u7EE7\u7EED\u6838\u5BF9\u6295\u8D44\u504F\u597D"] : ["\u6301\u7EED\u5339\u914D\u4E2D", "\u6709\u8FDB\u5C55\u65F6\u5C06\u53CA\u65F6\u901A\u77E5\u4F60"];
    return '<div class="p12-page">' + header("\u878D\u8D44\u5339\u914D\u8FDB\u5EA6") + '<section class="p12-status-head ' + (hasProgress ? "has-result" : "") + '"><span>' + icon(copy.iconName, 26) + "</span><h1>" + copy.title + "</h1><p>" + copy.desc + "</p>" + (copy.action ? '<button class="btn btn-primary" id="p12ViewResults" type="button">' + copy.action + "</button>" : "") + "</section>" + connectionOverview() + '<section class="p12-status-list"><h2>\u672C\u8F6E\u8FDB\u5EA6</h2>' + timelineView(state2) + '</section><section class="p12-notice"><div><h2>\u8FDB\u5C55\u901A\u77E5</h2><button id="p12NoticeInfo" type="button">\u7BA1\u7406</button></div><p><span>' + icon("inbox", 16) + "\u7AD9\u5185\u6D88\u606F\u5DF2\u5F00\u542F</span><span>" + icon("message", 16) + (isWecomAdded() ? "\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1\u5DF2\u6DFB\u52A0" : "\u4F01\u4E1A\u5FAE\u4FE1\u5F85\u6DFB\u52A0") + '</span></p></section><section class="p12-manage"><h2>\u672C\u8F6E\u5339\u914D\u7BA1\u7406</h2><div class="p12-manage-row"><span class="p12-manage-icon">' + icon("file-text", 17) + '</span><span class="p12-manage-copy"><small>\u5F53\u524D BP</small><strong>' + escapeHTML(state2.bpName || "\u661F\u8FB0\u79D1\u6280\u5546\u4E1A\u8BA1\u5212\u4E66.pdf") + "</strong><em>" + escapeHTML(state2.bpUpdatedAt || "2026-09-03") + ' \u66F4\u65B0</em></span><button id="p12UpdateBp" type="button">\u66F4\u65B0 ' + icon("chevron-right", 14) + '</button></div><div class="p12-manage-row"><span class="p12-manage-icon">' + icon(state2.paused ? "pause" : "refresh", 17) + '</span><span class="p12-manage-copy"><small>\u5339\u914D\u72B6\u6001</small><strong>' + manageState[0] + "</strong><em>" + manageState[1] + '</em></span><button id="p12TogglePause" type="button">' + (state2.paused ? "\u6062\u590D" : "\u6682\u505C") + " " + icon("chevron-right", 14) + '</button></div><button class="p12-manage-row p12-manage-record" id="p12Logs" type="button"><span class="p12-manage-icon">' + icon("shield", 17) + '</span><span class="p12-manage-copy"><small>\u8D44\u6599\u6743\u9650</small><strong>\u6388\u6743\u4E0E\u8BBF\u95EE\u8BB0\u5F55</strong><em>\u6309\u6295\u8D44\u4EBA\u67E5\u770B\u81EA\u52A8\u6838\u9A8C\u4E0E\u8BBF\u95EE\u7559\u75D5</em></span><span class="p12-manage-link">\u67E5\u770B ' + icon("chevron-right", 14) + '</span></button><div class="p12-manage-danger"><button id="p12End" type="button">\u7ED3\u675F\u672C\u8F6E\u5339\u914D</button></div></section></div>';
  }
  function connectionMeta(investor, state2) {
    const record = state2.investorConnections?.[investor.id];
    const labels = {
      requested: ["\u6295\u8D44\u4EBA\u7533\u8BF7\u5EFA\u8054", "\u5904\u7406\u5EFA\u8054\u7533\u8BF7", "needs-action"],
      entrepreneur_requested: ["\u5BF9\u63A5\u7533\u8BF7\u5DF2\u53D1\u9001 \xB7 \u7B49\u5F85\u6295\u8D44\u4EBA\u786E\u8BA4", "\u67E5\u770B\u7533\u8BF7", "status-waiting"],
      confirmed: ["\u53CC\u65B9\u5DF2\u786E\u8BA4\u5BF9\u63A5", "\u67E5\u770B\u5EFA\u8054\u8FDB\u5EA6", "status-working"],
      connecting: ["\u5E73\u53F0\u987E\u95EE\u6B63\u5728\u62C9\u7FA4", "\u67E5\u770B\u5EFA\u8054\u8FDB\u5EA6", "status-working"],
      connected: ["\u5EFA\u8054\u5DF2\u5B8C\u6210", "\u67E5\u770B\u5EFA\u8054\u8BB0\u5F55", "status-complete"],
      declined: ["\u4F60\u5DF2\u6682\u4E0D\u5EFA\u8054", "\u67E5\u770B\u5904\u7406\u8BB0\u5F55", "status-closed"],
      withdrawn: ["\u6295\u8D44\u4EBA\u5DF2\u64A4\u56DE\u7533\u8BF7", "\u67E5\u770B\u5904\u7406\u8BB0\u5F55", "status-closed"],
      expired: ["\u5EFA\u8054\u7533\u8BF7\u5DF2\u8D85\u65F6", "\u67E5\u770B\u5904\u7406\u8BB0\u5F55", "status-closed"]
    };
    const freshResult = state2.status === "matched" && state2.recommendedInvestorIds?.includes(investor.id) && !record;
    return record && labels[record.status] ? { record, label: labels[record.status][0], action: labels[record.status][1], className: labels[record.status][2], fresh: false } : { record: null, label: freshResult ? "\u6B63\u5728\u627E\u9879\u76EE \xB7 \u4E0E\u4F60\u7684\u9879\u76EE\u5951\u5408" : investor.accessStatus, action: "\u67E5\u770B\u8BE6\u60C5", className: freshResult ? "status-active" : "", fresh: freshResult };
  }
  function opensConnection(record) {
    return record && ["confirmed", "connecting", "connected"].includes(record.status);
  }
  function resultsView(state2) {
    const batchIndex = Number(state2.investorBatch || 0) % investorBatches.length;
    const batch = investorBatches[batchIndex];
    return '<div class="p12-page">' + header("\u5339\u914D\u5230\u7684\u6295\u8D44\u4EBA") + '<section class="p12-results-head"><div><h1>\u672C\u6279\u63A8\u8350\u7684\u6295\u8D44\u4EBA</h1><span>\u7B2C ' + (batchIndex + 1) + " \u6279 \xB7 " + batch.length + ' \u4F4D</span></div><p>\u4EE5\u4E0B\u6295\u8D44\u4EBA\u5DF2\u53D1\u5E03\u6709\u6548\u7684\u201C\u6211\u8981\u627E\u9879\u76EE\u201D\u9700\u6C42\u5E76\u5B8C\u6210\u6295\u5411\u586B\u62A5\u3002\u6BCF\u6279\u6700\u591A\u5C55\u793A 5 \u4F4D\uFF0C\u5E73\u53F0\u5C55\u793A\u5177\u4F53\u5339\u914D\u4F9D\u636E\uFF0C\u4E0D\u516C\u5F00\u5185\u90E8\u5339\u914D\u5206\u6570\u3002</p></section><section class="p12-investor-list">' + batch.map((investor) => {
      const meta = connectionMeta(investor, state2);
      const controls = meta.fresh ? '<div class="p12-investor-card-buttons"><button type="button" data-investor-detail="' + investor.id + '">\u67E5\u770B\u8BE6\u60C5</button><button class="is-primary" type="button" data-investor-request="' + investor.id + '">\u7533\u8BF7\u5BF9\u63A5</button></div>' : '<button type="button" data-investor-id="' + investor.id + '">' + meta.action + "</button>";
      return '<article class="p12-investor"><div class="p12-investor-head"><span class="p12-investor-avatar">' + investor.name.slice(0, 1) + "</span><div><h2>" + investor.name + (investor.verified ? "<b>" + icon("check-circle", 13) + "\u8EAB\u4EFD\u5DF2\u6838\u9A8C</b>" : "") + "</h2><p>" + investor.role + '</p></div></div><p class="p12-investor-summary">' + investor.summary + "</p><dl><div><dt>\u5173\u6CE8\u65B9\u5411</dt><dd>" + investor.focus + "</dd></div><div><dt>\u504F\u597D\u9636\u6BB5</dt><dd>" + investor.stage + "</dd></div><div><dt>\u51FA\u624B\u533A\u95F4</dt><dd>" + investor.ticket + '</dd></div></dl><div class="p12-reasons"><strong>\u4E3A\u4EC0\u4E48\u5339\u914D</strong>' + investor.reasons.map((reason) => "<span>" + icon("check", 14) + reason + "</span>").join("") + '</div><div class="p12-investor-actions"><span class="' + meta.className + '">' + meta.label + "</span>" + controls + "</div></article>";
    }).join("") + '</section><button class="p12-change-batch" id="p12ChangeBatch" type="button">\u4E0D\u6EE1\u610F\uFF0C\u6362\u4E00\u6279 ' + icon("refresh", 14) + '</button><div class="p12-result-note">\u63A8\u8350\u6765\u81EA\u6295\u8D44\u4EBA\u5F53\u524D\u6709\u6548\u7684\u627E\u9879\u76EE\u9700\u6C42\u3002\u4F60\u53EF\u4EE5\u4E3B\u52A8\u7533\u8BF7\u5BF9\u63A5\uFF1B\u6295\u8D44\u4EBA\u9488\u5BF9\u9879\u76EE\u786E\u8BA4\u540E\uFF0C\u518D\u8FDB\u5165\u4F01\u4E1A\u5FAE\u4FE1\u5EFA\u8054\u3002</div></div>';
  }
  function investorSheet(investor, state2) {
    const record = state2.investorConnections?.[investor.id];
    const freshResult = state2.status === "matched" && state2.recommendedInvestorIds?.includes(investor.id) && !record;
    let action = '<div class="p12-waiting-action">' + icon("clock", 17) + "<span><strong>\u6682\u672A\u53D1\u8D77\u5EFA\u8054\u7533\u8BF7</strong><small>\u6295\u8D44\u4EBA\u67E5\u770B\u8D44\u6599\u4E0D\u4F1A\u81EA\u52A8\u5EFA\u8054\uFF1B\u6709\u660E\u786E\u610F\u5411\u540E\uFF0C\u5E73\u53F0\u4F1A\u901A\u77E5\u4F60\u5904\u7406\u3002</small></span></div>";
    if (freshResult) {
      action = '<div class="p12-active-demand">' + icon("search", 18) + '<span><strong>\u8BE5\u6295\u8D44\u4EBA\u6B63\u5728\u5BFB\u627E\u9879\u76EE</strong><small>\u5F53\u524D\u6295\u5411\u4E0E\u9879\u76EE\u5951\u5408\u3002\u7533\u8BF7\u540E\uFF0C\u5E73\u53F0\u4F1A\u5148\u53D1\u9001\u8131\u654F\u9879\u76EE\u6458\u8981\u4F9B\u5BF9\u65B9\u786E\u8BA4\u3002</small></span></div><button class="btn btn-primary btn-block" id="p12RequestInvestor" type="button">\u7533\u8BF7\u5BF9\u63A5</button>';
    } else if (record?.status === "entrepreneur_requested") {
      action = '<div class="p12-terminal-state pending">' + icon("clock", 18) + "<span><strong>\u5BF9\u63A5\u7533\u8BF7\u5DF2\u53D1\u9001</strong><small>" + (record.requestedAt || "\u521A\u521A") + " \xB7 \u8131\u654F\u9879\u76EE\u6458\u8981\u5DF2\u63A8\u9001\uFF0C\u7B49\u5F85\u6295\u8D44\u4EBA\u786E\u8BA4</small></span></div>";
    } else if (record?.status === "requested") {
      action = '<div class="p12-connection-request"><span>' + icon("message", 18) + "</span><div><strong>\u6295\u8D44\u4EBA\u7533\u8BF7\u5EFA\u8054</strong><small>" + (record.requestedAt || investor.requestAt) + "</small><p>" + investor.requestMessage + '</p></div></div><div class="p12-sheet-actions"><button class="btn btn-outline" id="p12Decline" type="button">\u6682\u4E0D\u5EFA\u8054</button><button class="btn btn-primary" id="p12Connect" type="button">\u540C\u610F\u5E73\u53F0\u534F\u52A9\u5EFA\u8054</button></div>';
    } else if (record?.status === "declined") {
      action = '<div class="p12-terminal-state declined">' + icon("check-circle", 18) + "<span><strong>\u4F60\u5DF2\u9009\u62E9\u6682\u4E0D\u5EFA\u8054</strong><small>" + (record.resolvedAt || "\u5904\u7406\u7ED3\u679C\u5DF2\u8BB0\u5F55") + " \xB7 \u7ED3\u679C\u5DF2\u540C\u6B65\u7ED9\u6295\u8D44\u4EBA\u7AEF</small></span></div>";
    } else if (record?.status === "withdrawn") {
      action = '<div class="p12-terminal-state withdrawn">' + icon("refresh", 18) + "<span><strong>\u6295\u8D44\u4EBA\u5DF2\u64A4\u56DE\u7533\u8BF7</strong><small>" + (record.resolvedAt || "\u672C\u6B21\u7533\u8BF7\u5DF2\u7ED3\u675F") + " \xB7 \u53CC\u65B9\u7AEF\u5747\u5DF2\u540C\u6B65\uFF0C\u65E0\u9700\u5904\u7406</small></span></div>";
    } else if (record?.status === "expired") {
      action = '<div class="p12-terminal-state expired">' + icon("clock", 18) + "<span><strong>\u672C\u6B21\u5EFA\u8054\u7533\u8BF7\u5DF2\u8D85\u65F6</strong><small>" + (record.resolvedAt || "\u5DF2\u81EA\u52A8\u5173\u95ED") + " \xB7 \u8D85\u8FC7 72 \u5C0F\u65F6\u672A\u5B8C\u6210\u53CC\u65B9\u786E\u8BA4</small></span></div>";
    }
    return '<div class="p12-investor-sheet"><div class="p12-investor-head"><span class="p12-investor-avatar">' + investor.name.slice(0, 1) + "</span><div><h2>" + investor.name + "<b>" + icon("check-circle", 13) + "\u8EAB\u4EFD\u5DF2\u6838\u9A8C</b></h2><p>" + investor.role + "</p></div></div><h3>\u6295\u8D44\u504F\u597D</h3><dl><div><dt>\u5173\u6CE8\u65B9\u5411</dt><dd>" + investor.focus + "</dd></div><div><dt>\u504F\u597D\u9636\u6BB5</dt><dd>" + investor.stage + "</dd></div><div><dt>\u5355\u7B14\u533A\u95F4</dt><dd>" + investor.ticket + "</dd></div><div><dt>\u5730\u57DF\u504F\u597D</dt><dd>" + investor.region + '</dd></div></dl><h3>\u5339\u914D\u4F9D\u636E</h3><div class="p12-reasons">' + investor.reasons.map((reason) => "<span>" + icon("check", 14) + reason + "</span>").join("") + '</div><h3>\u8D44\u6599\u8BBF\u95EE</h3><div class="p12-access-record">' + icon("shield", 17) + "<span><strong>" + (freshResult ? "\u5148\u53D1\u9001\u8131\u654F\u9879\u76EE\u6458\u8981" : investor.accessStatus) + "</strong><small>" + (freshResult ? "\u6295\u8D44\u4EBA\u786E\u8BA4\u611F\u5174\u8DA3\u540E\uFF0C\u53EF\u6309\u672C\u8F6E\u6388\u6743\u89C4\u5219\u7533\u8BF7\u67E5\u770B\u6700\u65B0\u7248\u5B8C\u6574 BP\uFF1B\u6BCF\u6B21\u8BBF\u95EE\u90FD\u4F1A\u7559\u75D5\u3002" : "\u8EAB\u4EFD\u3001\u5339\u914D\u6761\u4EF6\u3001\u67E5\u770B\u610F\u613F\u548C\u4FDD\u5BC6\u72B6\u6001\u5747\u5DF2\u81EA\u52A8\u6838\u9A8C\uFF0C\u8BBF\u95EE\u8BB0\u5F55\u5DF2\u7559\u75D5\u3002") + "</small></span></div>" + action + "</div>";
  }
  function connectionView(state2) {
    const investor = investors.find((item) => item.id === state2.connectionInvestorId) || investors[0];
    const record = state2.investorConnections?.[investor.id] || { status: "confirmed", requestedAt: investor.requestAt, confirmedAt: "09-03 13:52" };
    const entrepreneurInitiated = record.initiator === "entrepreneur";
    const connecting = record.status === "connecting";
    const connected = record.status === "connected";
    const added = isWecomAdded() || connecting || connected;
    const title = connected ? "\u4F01\u4E1A\u5FAE\u4FE1\u7FA4\u5DF2\u5EFA\u7ACB" : connecting ? "\u5E73\u53F0\u987E\u95EE\u6B63\u5728\u62C9\u7FA4" : "\u7EE7\u7EED\u5B8C\u6210\u5EFA\u8054";
    const description = connected ? "\u4F60\u548C\u6295\u8D44\u4EBA\u5DF2\u5B8C\u6210\u5EFA\u8054\u3002\u540E\u7EED\u9879\u76EE\u4EA4\u6D41\u5728\u4F01\u4E1A\u5FAE\u4FE1\u8FDB\u884C\uFF0C\u5C0F\u7A0B\u5E8F\u4FDD\u7559\u5173\u952E\u8FDB\u5C55\u548C\u8D44\u6599\u8BBF\u95EE\u8BB0\u5F55\u3002" : connecting ? "\u5E73\u53F0\u987E\u95EE\u5DF2\u6536\u5230\u53CC\u65B9\u786E\u8BA4\uFF0C\u6B63\u5728\u9080\u8BF7\u4F60\u548C\u6295\u8D44\u4EBA\u8FDB\u5165\u4F01\u4E1A\u5FAE\u4FE1\u7FA4\u3002" : "\u53CC\u65B9\u5DF2\u7ECF\u786E\u8BA4\u5BF9\u63A5\u3002\u6DFB\u52A0\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1\u540E\uFF0C\u987E\u95EE\u4F1A\u9080\u8BF7\u4F60\u548C\u6295\u8D44\u4EBA\u8FDB\u5165\u540C\u4E00\u4E2A\u7FA4\u3002";
    return '<div class="p12-page">' + header("\u6295\u8D44\u4EBA\u5EFA\u8054") + '<section class="p12-connect-hero ' + (connected ? "completed" : "") + '"><span>' + icon(connected ? "check-circle" : "message", 28) + "</span><h1>" + title + "</h1><p>" + description + '</p></section><section class="p12-connect-person"><span class="p12-investor-avatar">' + investor.name.slice(0, 1) + "</span><div><strong>" + investor.name + "</strong><small>" + investor.role + "</small></div><b>" + (connected ? "\u5DF2\u5EFA\u8054" : connecting ? "\u5EFA\u8054\u4E2D" : "\u5DF2\u786E\u8BA4") + '</b></section><section class="p12-connect-steps"><h2>\u5EFA\u8054\u8FDB\u5EA6</h2><div class="p12-timeline"><div class="done"><span>' + icon("check", 13) + "</span><div><strong>" + (entrepreneurInitiated ? "\u4F60\u5DF2\u7533\u8BF7\u5BF9\u63A5" : "\u6295\u8D44\u4EBA\u53D1\u8D77\u5EFA\u8054\u7533\u8BF7") + "</strong><small>" + (record.requestedAt || investor.requestAt) + '</small></div></div><div class="done"><span>' + icon("check", 13) + "</span><div><strong>" + (entrepreneurInitiated ? "\u6295\u8D44\u4EBA\u5DF2\u540C\u610F\u5BF9\u63A5" : "\u4F60\u5DF2\u540C\u610F\u5E73\u53F0\u534F\u52A9\u5EFA\u8054") + "</strong><small>" + (record.confirmedAt || "\u672C\u6B21\u786E\u8BA4\u5DF2\u7559\u75D5") + '</small></div></div><div class="' + (added ? "done" : "active") + '"><span>' + (added ? icon("check", 13) : "") + "</span><div><strong>" + (added ? "\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1\u5DF2\u6DFB\u52A0" : "\u6DFB\u52A0\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1") + '</strong><small>\u540E\u7EED\u7531\u5E73\u53F0\u987E\u95EE\u521B\u5EFA\u4F01\u4E1A\u5FAE\u4FE1\u7FA4</small></div></div><div class="' + (connected ? "done" : connecting ? "active" : "") + '"><span>' + (connected ? icon("check", 13) : "") + "</span><div><strong>" + (connected ? "\u4F01\u4E1A\u5FAE\u4FE1\u7FA4\u5DF2\u5EFA\u7ACB" : connecting ? "\u5E73\u53F0\u987E\u95EE\u6B63\u5728\u62C9\u7FA4" : "\u7B49\u5F85\u5E73\u53F0\u987E\u95EE\u62C9\u7FA4") + "</strong><small>" + (connected ? record.groupCreatedAt || "09-03 14:40" : "\u7FA4\u5185\u7EE7\u7EED\u4EA4\u6D41\u9879\u76EE\u548C\u878D\u8D44\u5B89\u6392") + "</small></div></div></div></section>" + (record.status === "confirmed" ? '<section class="p12-wecom-next">' + icon("message", 20) + "<div><strong>" + (isWecomAdded() ? "\u4F01\u4E1A\u5FAE\u4FE1\u5DF2\u6DFB\u52A0" : "\u4E0B\u4E00\u6B65\uFF1A\u6DFB\u52A0\u5E73\u53F0\u4F01\u4E1A\u5FAE\u4FE1") + "</strong><p>" + (isWecomAdded() ? "\u5E73\u53F0\u987E\u95EE\u4F1A\u7EE7\u7EED\u5904\u7406\u62C9\u7FA4\uFF0C\u65E0\u9700\u5728\u5C0F\u7A0B\u5E8F\u5185\u7B49\u5F85\u3002" : "\u5C0F\u7A0B\u5E8F\u4E0D\u63D0\u4F9B\u53CC\u65B9\u5B9E\u65F6\u804A\u5929\u6216\u8054\u7CFB\u65B9\u5F0F\u4EA4\u6362\uFF0C\u6DFB\u52A0\u540E\u7531\u5E73\u53F0\u987E\u95EE\u534F\u52A9\u62C9\u7FA4\u3002") + '</p></div><button class="btn btn-primary" id="p12AddWecom" type="button">' + (isWecomAdded() ? "\u901A\u77E5\u987E\u95EE\u62C9\u7FA4" : "\u67E5\u770B\u4F01\u4E1A\u5FAE\u4FE1\u4E8C\u7EF4\u7801") + "</button></section>" : connecting ? '<section class="p12-connected-note working"><strong>\u5E73\u53F0\u6B63\u5728\u5904\u7406</strong><p>\u65E0\u9700\u505C\u7559\u7B49\u5F85\u3002\u5EFA\u8054\u5B8C\u6210\u540E\u4F1A\u901A\u8FC7\u7AD9\u5185\u6D88\u606F\u3001\u77ED\u4FE1\u548C\u4F01\u4E1A\u5FAE\u4FE1\u901A\u77E5\u4F60\u3002</p></section>' : '<section class="p12-connected-note"><strong>\u5EFA\u8054\u5DF2\u5B8C\u6210</strong><p>\u672C\u8F6E\u5339\u914D\u4ECD\u4F1A\u7EE7\u7EED\u3002\u65B0\u7684\u6295\u8D44\u4EBA\u5339\u914D\u7ED3\u679C\u548C\u5EFA\u8054\u7533\u8BF7\u4F1A\u5355\u72EC\u901A\u77E5\u4F60\u3002</p></section>') + (connecting || connected ? '<div class="p12-connect-actions"><button class="btn btn-outline" id="p12BackResults" type="button">\u67E5\u770B\u5176\u4ED6\u6295\u8D44\u4EBA</button><button class="btn btn-primary" id="p12BackProgress" type="button">\u8FD4\u56DE\u878D\u8D44\u8FDB\u5EA6</button></div>' : "") + "</div>";
  }
  function accessLogSheet() {
    return '<div class="p12-log-list"><div><strong>\u6700\u65B0\u7248 BP \u6388\u6743\u751F\u6548</strong><small>09-03 10:20 \xB7 \u672C\u8F6E\u878D\u8D44\u5339\u914D</small></div><div><strong>\u738B\u5148\u751F\u7533\u8BF7\u5EFA\u8054</strong><small>09-03 13:36 \xB7 \u7B49\u5F85\u521B\u4E1A\u8005\u5904\u7406</small></div><div><strong>\u9648\u5973\u58EB\u8FDB\u5165\u5EFA\u8054\u5904\u7406</strong><small>09-03 12:28 \xB7 \u5E73\u53F0\u987E\u95EE\u6B63\u5728\u62C9\u7FA4</small></div><div><strong>\u5218\u5148\u751F\u5DF2\u5B8C\u6210\u5EFA\u8054</strong><small>09-03 09:18 \xB7 \u4F01\u4E1A\u5FAE\u4FE1\u7FA4\u5DF2\u5EFA\u7ACB</small></div><div><strong>\u5468\u5973\u58EB\u64A4\u56DE\u5EFA\u8054\u7533\u8BF7</strong><small>09-02 18:30 \xB7 \u53CC\u65B9\u7AEF\u540C\u6B65\u7ED3\u675F</small></div><div><strong>\u8D75\u5148\u751F\u5EFA\u8054\u7533\u8BF7\u8D85\u65F6</strong><small>09-02 10:15 \xB7 \u8D85\u8FC7 72 \u5C0F\u65F6\u81EA\u52A8\u5173\u95ED</small></div></div>';
  }
  function beginGroupConnection(investorId) {
    updateInvestorConnection(investorId, { status: "connecting" });
    refreshActivePage();
    setTimeout(() => {
      if (document.getElementById("page-container")?.getAttribute("data-page") !== "p12") return;
      const record = getInvestorConnection(investorId);
      if (record?.status !== "connecting") return;
      updateInvestorConnection(investorId, { status: "connected", groupCreatedAt: "09-03 14:40" });
      refreshActivePage();
    }, 1400);
  }
  function openInvestorDetails(investor) {
    const record = getInvestorConnection(investor.id);
    if (opensConnection(record)) {
      updateFundraisingState({ connectionInvestorId: investor.id });
      navigateTo("p12", { stage: "connection" });
      return;
    }
    const overlay = showSheet({ title: "\u6295\u8D44\u4EBA\u8BE6\u60C5", body: investorSheet(investor, getFundraisingState()) });
    const request = overlay.querySelector("#p12RequestInvestor");
    if (request) request.addEventListener("click", () => {
      overlay.remove();
      requestInvestorConnection(investor);
    });
    const connect = overlay.querySelector("#p12Connect");
    if (connect) connect.addEventListener("click", () => {
      overlay.remove();
      updateInvestorConnection(investor.id, { status: "confirmed", confirmedAt: "09-03 13:52" });
      updateFundraisingState({ connectionInvestorId: investor.id });
      navigateTo("p12", { stage: "connection" });
    });
    const decline = overlay.querySelector("#p12Decline");
    if (decline) decline.addEventListener("click", () => {
      overlay.remove();
      updateInvestorConnection(investor.id, { status: "declined", resolvedAt: "09-03 14:10" });
      refreshActivePage();
      toast("\u5DF2\u540C\u6B65\u7ED9\u6295\u8D44\u4EBA\uFF1A\u672C\u8F6E\u6682\u4E0D\u5EFA\u8054");
    });
  }
  var page12 = {
    render(params) {
      const state2 = getFundraisingState();
      const stage = params.stage || (state2.status === "idle" ? "intro" : "progress");
      if (stage === "intro") return introView(state2);
      if (stage === "confirm") return confirmView(state2);
      if (stage === "preview") return previewView(state2);
      if (stage === "authorize") return authorizeView(state2);
      if (stage === "matching") return matchingView(state2);
      if (stage === "results") return resultsView(state2);
      if (stage === "connection") return connectionView(state2);
      return progressView(state2);
    },
    init(params) {
      showTabBar(false);
      document.getElementById("p12Back").addEventListener("click", goBackToPrevious);
      const state2 = getFundraisingState();
      const stage = params.stage || (state2.status === "idle" ? "intro" : "progress");
      if (state2.connectionNoticeInvestorId && ["progress", "results"].includes(stage)) {
        setTimeout(() => {
          const current = getFundraisingState();
          const investor = investors.find((item) => item.id === current.connectionNoticeInvestorId);
          if (!investor || document.getElementById("page-container")?.getAttribute("data-page") !== "p12") return;
          updateFundraisingState({ connectionNoticeInvestorId: "" });
          showMutualConnectionNotice(investor);
        }, 80);
      }
      if (stage === "intro") {
        document.getElementById("p12UseBp").addEventListener("click", () => navigateTo("p12", { stage: "confirm" }));
        document.getElementById("p12Upload").addEventListener("click", () => {
          updateFundraisingState({ bpName: "\u661F\u8FB0\u79D1\u6280\u5546\u4E1A\u8BA1\u5212\u4E66-\u65B0\u7248.pdf", bpUpdatedAt: "2026-09-03" });
          refreshActivePage();
          toast("\u65B0\u7248\u672C BP \u5DF2\u4E0A\u4F20");
        });
        document.getElementById("p12PreviewFile").addEventListener("click", () => toast("\u6B63\u5728\u6253\u5F00 BP \u5B89\u5168\u9884\u89C8"));
      } else if (stage === "confirm") {
        document.getElementById("p12ConfirmInfo").addEventListener("click", () => {
          updateFundraisingState({ project: { industry: document.getElementById("p12Industry").value.trim(), region: document.getElementById("p12Region").value.trim(), stage: document.getElementById("p12Stage").value.trim(), round: document.getElementById("p12Round").value.trim(), amount: document.getElementById("p12Amount").value.trim(), useOfFunds: document.getElementById("p12Use").value.trim() } });
          navigateTo("p12", { stage: "preview" });
        });
      } else if (stage === "preview") {
        document.getElementById("p12AcceptPreview").addEventListener("click", () => navigateTo("p12", { stage: "authorize" }));
      } else if (stage === "authorize") {
        const check = document.getElementById("p12Consent");
        const submit = document.getElementById("p12Submit");
        check.addEventListener("change", () => {
          submit.disabled = !check.checked;
        });
        document.getElementById("p12Agreement").addEventListener("click", () => showSheet({ title: "\u878D\u8D44\u5339\u914D\u4FDD\u5BC6\u4E0E\u6388\u6743\u534F\u8BAE", body: '<div class="p12-agreement-copy"><p>\u5E73\u53F0\u4EC5\u5728\u672C\u8F6E\u878D\u8D44\u5339\u914D\u671F\u95F4\uFF0C\u5411\u7B26\u5408\u6761\u4EF6\u4E14\u5DF2\u5B8C\u6210\u8EAB\u4EFD\u6838\u9A8C\u7684\u6295\u8D44\u4EBA\u5F00\u653E\u6700\u65B0\u7248 BP\u3002</p><p>\u6BCF\u6B21\u8D44\u6599\u5F00\u653E\u524D\u90FD\u4F1A\u6838\u9A8C\u6295\u8D44\u4EBA\u8EAB\u4EFD\u3001\u5339\u914D\u6761\u4EF6\u3001\u771F\u5B9E\u67E5\u770B\u610F\u613F\u53CA\u4FDD\u5BC6\u72B6\u6001\uFF0C\u5E76\u751F\u6210\u72EC\u7ACB\u8BBF\u95EE\u8BB0\u5F55\u3002</p><p>\u5E73\u53F0\u8D1F\u8D23\u5339\u914D\u4E0E\u5EFA\u8054\u534F\u52A9\uFF0C\u4E0D\u627F\u8BFA\u878D\u8D44\u7ED3\u679C\uFF0C\u4E5F\u4E0D\u4F1A\u516C\u5F00\u5C55\u793A\u5168\u91CF\u9879\u76EE\u4FE1\u606F\u3002</p></div>' }));
        submit.addEventListener("click", () => {
          if (!check.checked) return;
          updateFundraisingState({ authorized: true, status: "matching", submittedAt: "09-03 10:20", excluded: document.getElementById("p12Exclusion").value.trim(), investorBatch: 0 });
          navigateTo("p12", { stage: "matching" });
        });
      } else if (stage === "matching") {
        setTimeout(() => {
          if (document.getElementById("page-container")?.getAttribute("data-page") !== "p12") return;
          updateFundraisingState({ status: "waiting" });
          replaceCurrentPage("p12", { stage: "progress" });
          refreshActivePage();
        }, 1500);
      } else if (stage === "progress") {
        if (state2.status === "waiting" && !state2.paused) scheduleDemoMatchResult();
        if (getConnectionCounts().entrepreneur_requested) scheduleDemoInvestorConfirmation();
        if (state2.resultNoticePending) {
          setTimeout(() => {
            const current = getFundraisingState();
            const stillOnProgress = document.getElementById("page-container")?.getAttribute("data-page") === "p12" && document.getElementById("p12ViewResults");
            if (!stillOnProgress || !current.resultNoticePending) return;
            consumeFundraisingResultNotice();
            showMatchResultNotice();
          }, 80);
        }
        const view = document.getElementById("p12ViewResults");
        if (view) view.addEventListener("click", () => navigateTo("p12", { stage: "results" }));
        const overview = document.getElementById("p12OverviewResults");
        if (overview) overview.addEventListener("click", () => navigateTo("p12", { stage: "results" }));
        document.getElementById("p12UpdateBp").addEventListener("click", () => {
          updateFundraisingState({ bpName: "\u661F\u8FB0\u79D1\u6280\u5546\u4E1A\u8BA1\u5212\u4E66-\u65B0\u7248.pdf", bpUpdatedAt: "2026-09-03" });
          toast("\u6700\u65B0\u7248 BP \u5DF2\u63D0\u4EA4\uFF0C\u5C06\u91CD\u65B0\u6838\u5BF9\u5339\u914D\u6761\u4EF6");
        });
        document.getElementById("p12TogglePause").addEventListener("click", () => {
          updateFundraisingState({ paused: !state2.paused });
          refreshActivePage();
        });
        document.getElementById("p12Logs").addEventListener("click", () => showSheet({ title: "\u8D44\u6599\u6388\u6743\u4E0E\u8BBF\u95EE\u8BB0\u5F55", body: accessLogSheet() }));
        document.getElementById("p12NoticeInfo").addEventListener("click", () => toast("\u53EF\u5728\u6D88\u606F\u8BBE\u7F6E\u4E2D\u7BA1\u7406\u901A\u77E5\u6E20\u9053"));
        document.getElementById("p12End").addEventListener("click", () => showModal({ title: "\u7ED3\u675F\u672C\u8F6E\u878D\u8D44\u5339\u914D\uFF1F", body: "\u7ED3\u675F\u540E\u5C06\u505C\u6B62\u540E\u7EED\u5339\u914D\u548C\u8D44\u6599\u5F00\u653E\uFF0C\u5DF2\u53D1\u751F\u7684\u67E5\u770B\u4E0E\u5EFA\u8054\u8BB0\u5F55\u4ECD\u4F1A\u4FDD\u7559\u3002", confirmText: "\u786E\u8BA4\u7ED3\u675F", danger: true, onConfirm() {
          resetFundraisingState();
          goBackToPrevious();
        } }));
      } else if (stage === "results") {
        scheduleDemoInvestorConfirmation();
        document.querySelectorAll("[data-investor-id]").forEach((button) => {
          button.addEventListener("click", function() {
            const investor = investors.find((item) => item.id === this.getAttribute("data-investor-id"));
            openInvestorDetails(investor);
          });
        });
        document.querySelectorAll("[data-investor-detail]").forEach((button) => {
          button.addEventListener("click", function() {
            const investor = investors.find((item) => item.id === this.getAttribute("data-investor-detail"));
            openInvestorDetails(investor);
          });
        });
        document.querySelectorAll("[data-investor-request]").forEach((button) => {
          button.addEventListener("click", function() {
            const investor = investors.find((item) => item.id === this.getAttribute("data-investor-request"));
            requestInvestorConnection(investor);
          });
        });
        document.getElementById("p12ChangeBatch").addEventListener("click", () => {
          updateFundraisingState({ investorBatch: (Number(state2.investorBatch || 0) + 1) % investorBatches.length });
          refreshActivePage();
          toast("\u5DF2\u4E3A\u4F60\u6362\u4E00\u6279\u63A8\u8350");
        });
      } else if (stage === "connection") {
        const addWecom = document.getElementById("p12AddWecom");
        if (addWecom) addWecom.addEventListener("click", () => {
          const investorId = getFundraisingState().connectionInvestorId || "i001";
          if (isWecomAdded()) beginGroupConnection(investorId);
          else openWecomGuide("fundraisingConnection", () => beginGroupConnection(investorId));
        });
        const backResults = document.getElementById("p12BackResults");
        if (backResults) backResults.addEventListener("click", () => navigateTo("p12", { stage: "results" }));
        const backProgress = document.getElementById("p12BackProgress");
        if (backProgress) backProgress.addEventListener("click", () => navigateTo("p12", { stage: "progress" }));
      }
    }
  };
  register("p12", page12);

  // src/pages/p13-staged-service/index.js
  var journeys = /* @__PURE__ */ new Map();
  var stepNames = ["\u8BC4\u4F30\u62A5\u4EF7", "\u7B7E\u7F72\u534F\u8BAE", "\u7B2C\u4E00\u9636\u6BB5", "\u7B2C\u4E8C\u9636\u6BB5", "\u529E\u7406\u7ED3\u679C"];
  function stateKey(params) {
    return `${params.teamId || ""}:${params.sku || ""}`;
  }
  function getJourney(params) {
    const key = stateKey(params);
    if (!journeys.has(key)) journeys.set(key, { stage: "intake", intake: "", agreementStatus: "customer_action", customerAgreementFile: "", providerProgressScheduled: false, firstPaid: false, secondPaid: false });
    return journeys.get(key);
  }
  function stepIndex(stage) {
    if (["intake", "proposal"].includes(stage)) return 0;
    if (stage === "contract") return 1;
    if (["firstPayment", "milestone"].includes(stage)) return 2;
    if (stage === "secondPayment") return 3;
    return 4;
  }
  function header2() {
    return '<div class="nav-bar"><button class="nav-back" id="p13Back" type="button" aria-label="\u8FD4\u56DE">' + icon("chevron-left", 22) + '</button><div class="nav-title">\u5206\u9636\u6BB5\u670D\u52A1</div><div class="nav-action"></div></div>';
  }
  function stepper(stage) {
    const active = stepIndex(stage);
    return '<ol class="p13-stepper" aria-label="\u670D\u52A1\u8FDB\u5EA6">' + stepNames.map((name, index) => '<li class="' + (index < active ? "done" : index === active ? "active" : "") + '"><span>' + (index < active ? icon("check", 12) : index + 1) + "</span><small>" + name + "</small></li>").join("") + "</ol>";
  }
  function contextCard(team, config) {
    return '<section class="p13-context"><span style="background:' + escapeHTML(team.avatarColor) + "18;color:" + escapeHTML(team.avatarColor) + '">' + escapeHTML(team.avatar) + "</span><div><small>" + escapeHTML(config.categoryName) + " \xB7 \u6309\u9879\u76EE\u8BC4\u4F30\u62A5\u4EF7</small><strong>" + escapeHTML(config.sku) + "</strong><em>" + escapeHTML(team.name) + "</em></div><b>\u5206\u4E24\u9636\u6BB5\u4ED8\u6B3E</b></section>";
  }
  function renderList(items) {
    return "<ul>" + items.map((item) => "<li>" + icon("check", 14) + "<span>" + escapeHTML(item) + "</span></li>").join("") + "</ul>";
  }
  function intakeView(team, config, journey) {
    return '<section class="p13-hero"><span>' + icon("message", 24) + '</span><h1>\u5148\u5B8C\u6210\u9879\u76EE\u8BC4\u4F30</h1><p>\u5E73\u53F0\u9700\u6C42\u52A9\u624B\u5148\u6536\u96C6\u57FA\u7840\u4FE1\u606F\u5E76\u540C\u6B65\u7ED9\u56E2\u961F\uFF1B\u6D89\u53CA\u4E13\u4E1A\u5224\u65AD\u65F6\uFF0C\u5E73\u53F0\u987E\u95EE\u4F1A\u901A\u8FC7\u4F01\u4E1A\u5FAE\u4FE1\u62C9\u7FA4\u786E\u8BA4\u3002</p></section><section class="p13-panel p13-intake"><h2>\u8865\u5145\u8BC4\u4F30\u4FE1\u606F</h2><label for="p13Intake">' + escapeHTML(config.intakeLabel) + '</label><textarea id="p13Intake" maxlength="500" rows="6" placeholder="' + escapeHTML(config.intakeExample) + '">' + escapeHTML(journey.intake || config.intakeExample) + '</textarea><div><span>\u670D\u52A1\u5546\u8BC4\u4F30\u540E\u63A8\u9001\u670D\u52A1\u8303\u56F4\u3001\u603B\u4EF7\u548C\u4E24\u7B14\u4ED8\u6B3E\u8282\u70B9</span><b id="p13Count">' + String((journey.intake || config.intakeExample).length) + '/500</b></div><button class="btn btn-primary btn-block" id="p13SubmitIntake" type="button">\u63D0\u4EA4\u8BC4\u4F30\u8D44\u6599</button></section>';
  }
  function proposalView(config) {
    return '<section class="p13-stage-head"><span>' + icon("file-text", 24) + '</span><div><h1>\u670D\u52A1\u65B9\u6848\u4E0E\u5206\u9636\u6BB5\u62A5\u4EF7</h1><p>\u670D\u52A1\u8303\u56F4\u548C\u4ED8\u6B3E\u8282\u70B9\u5DF2\u7ECF\u56E2\u961F\u586B\u5199\u5E76\u7ECF\u5E73\u53F0\u5BA1\u6838\u3002</p></div></section><section class="p13-panel p13-proposal"><div class="p13-proposal-top"><div><small>\u670D\u52A1\u603B\u4EF7</small><strong>' + config.total + "</strong></div><span>\u5F85\u4F60\u786E\u8BA4</span></div><dl><div><dt>\u9884\u8BA1\u5468\u671F</dt><dd>" + escapeHTML(config.period) + '</dd></div><div><dt>\u5B98\u65B9\u53CA\u7B2C\u4E09\u65B9\u8D39\u7528</dt><dd>\u672A\u5305\u542B\uFF0C\u53D1\u751F\u65F6\u53E6\u884C\u5217\u793A</dd></div></dl><div class="p13-payment-plan"><article><b>\u7B2C\u4E00\u9636\u6BB5\u670D\u52A1\u6B3E</b><strong>' + config.firstAmount + "</strong><small>\u534F\u8BAE\u751F\u6548\u540E\u652F\u4ED8\uFF0C\u786E\u8BA4\u5230\u8D26\u540E\u5F00\u59CB\u670D\u52A1</small></article><article><b>\u7B2C\u4E8C\u9636\u6BB5\u670D\u52A1\u6B3E</b><strong>" + config.secondAmount + "</strong><small>" + escapeHTML(config.secondTrigger) + "</small></article></div><h3>\u4E24\u9636\u6BB5\u4EA4\u4ED8</h3>" + renderList(config.firstWork.concat(config.secondWork)) + '</section><section class="p13-risk"><span>' + icon("alert", 18) + '</span><div><strong>\u529E\u7406\u7ED3\u679C\u5B58\u5728\u4E0D\u786E\u5B9A\u6027</strong><p>\u670D\u52A1\u8D39\u6309\u7EA6\u5B9A\u9636\u6BB5\u5DE5\u4F5C\u6536\u53D6\uFF0C\u4E3B\u7BA1\u673A\u6784\u7684\u5BA1\u67E5\u6216\u8BC4\u5BA1\u7ED3\u679C\u4E0D\u7531\u5E73\u53F0\u548C\u670D\u52A1\u56E2\u961F\u4FDD\u8BC1\u3002\u5DF2\u5B8C\u6210\u9636\u6BB5\u7684\u670D\u52A1\u8D39\u4E0D\u56E0\u6700\u7EC8\u672A\u83B7\u6279\u800C\u9000\u8FD8\uFF1B\u670D\u52A1\u5546\u672A\u6309\u7EA6\u5C65\u884C\u7684\u9664\u5916\u3002</p></div></section><label class="p13-consent"><input id="p13RiskConsent" type="checkbox"><span>\u6211\u5DF2\u7406\u89E3\u5206\u9636\u6BB5\u4ED8\u6B3E\u3001\u7ED3\u679C\u4E0D\u627F\u8BFA\u53CA\u9000\u6B3E\u89C4\u5219</span></label><div class="p13-page-action"><button class="btn btn-primary btn-block" id="p13ConfirmProposal" type="button" disabled>\u786E\u8BA4\u65B9\u6848\u5E76\u7B7E\u7F72\u534F\u8BAE</button></div>';
  }
  function contractView(config, journey) {
    const status = journey.agreementStatus || "customer_action";
    const activeStep = { customer_action: 0, provider_signing: 1, auditing: 2, approved: 4 }[status];
    const stepLabels = ["\u5BA2\u6237\u8865\u5145\u4FE1\u606F\u5E76\u7528\u5370", "\u670D\u52A1\u5546\u7528\u5370", "\u5E73\u53F0\u5BA1\u6838", "\u534F\u8BAE\u751F\u6548"];
    const steps3 = stepLabels.map((label, index) => '<span class="' + (index < activeStep ? "done" : index === activeStep ? "active" : "") + '">' + label + "</span>").join("");
    let action = "";
    if (status === "customer_action") {
      action = '<label class="p13-upload">' + icon("upload", 18) + '<span id="p13AgreementFileName">\u9009\u62E9\u5DF2\u7528\u5370\u534F\u8BAE\u626B\u63CF\u4EF6</span><input id="p13AgreementFile" type="file" accept=".pdf,.jpg,.jpeg,.png"></label><button class="btn btn-primary btn-block" id="p13SubmitAgreement" type="button">\u4E0A\u4F20\u5E76\u63D0\u4EA4\u7ED9\u670D\u52A1\u5546</button>';
    } else if (status === "provider_signing") {
      action = '<div class="p13-contract-state waiting"><span>' + icon("clock", 22) + "</span><div><strong>\u7B49\u5F85\u670D\u52A1\u5546\u7528\u5370</strong><p>\u4F60\u7684\u7528\u5370\u6587\u4EF6\u5DF2\u4E8E\u521A\u521A\u540C\u6B65\u7ED9\u670D\u52A1\u5546\u3002\u670D\u52A1\u5546\u56DE\u4F20\u540E\u4F1A\u81EA\u52A8\u63A8\u9001\u5230\u8FD9\u91CC\u3002</p></div></div>";
    } else {
      action = '<div class="p13-contract-state ' + (status === "approved" ? "approved" : "") + '"><span>' + icon(status === "approved" ? "check-circle" : "shield", 22) + "</span><div><strong>" + (status === "approved" ? "\u534F\u8BAE\u5BA1\u6838\u901A\u8FC7" : "\u670D\u52A1\u5546\u5DF2\u5B8C\u6210\u7528\u5370") + "</strong><p>" + (status === "approved" ? "\u53CC\u65B9\u534F\u8BAE\u5DF2\u7ECF\u5F52\u6863\uFF0C\u53EF\u4EE5\u8FDB\u5165\u7B2C\u4E00\u9636\u6BB5\u4ED8\u6B3E\u3002" : "\u53CC\u65B9\u7528\u5370\u534F\u8BAE\u5DF2\u8FD4\u56DE\uFF0C\u5E73\u53F0\u6B63\u5728\u6838\u5BF9\u7B7E\u7EA6\u4E3B\u4F53\u3001\u91D1\u989D\u548C\u670D\u52A1\u8303\u56F4\u3002") + '</p></div></div><button class="p13-file-row p13-returned-file" id="p13ReturnedAgreement" type="button">' + icon("file-text", 19) + "<span><strong>\u53CC\u65B9\u7528\u5370\u670D\u52A1\u534F\u8BAE.pdf</strong><small>\u670D\u52A1\u5546\u56DE\u4F20 \xB7 " + (status === "approved" ? "\u5E73\u53F0\u5BA1\u6838\u901A\u8FC7" : "\u5E73\u53F0\u5BA1\u6838\u4E2D") + '</small></span><b>\u67E5\u770B</b></button><button class="btn btn-primary btn-block" id="' + (status === "approved" ? "p13ToFirstPayment" : "p13AuditResult") + '" type="button">' + (status === "approved" ? "\u652F\u4ED8\u7B2C\u4E00\u9636\u6BB5\u670D\u52A1\u6B3E" : "\u5728 Demo \u4E2D\u67E5\u770B\u5BA1\u6838\u7ED3\u679C") + "</button>";
    }
    return '<section class="p13-stage-head"><span>' + icon("shield", 24) + '</span><div><h1>\u7B7E\u7F72\u670D\u52A1\u534F\u8BAE</h1><p>\u534F\u8BAE\u4F1A\u5199\u660E\u4E24\u7B14\u670D\u52A1\u6B3E\u3001\u5BF9\u5E94\u6210\u679C\u3001\u6682\u505C\u6761\u4EF6\u53CA\u9000\u6B3E\u89C4\u5219\u3002</p></div></section><section class="p13-panel"><button class="p13-file-row" id="p13AgreementPreview" type="button">' + icon("file-text", 20) + "<span><strong>" + escapeHTML(config.sku) + '\u5206\u9636\u6BB5\u670D\u52A1\u534F\u8BAE.pdf</strong><small>\u670D\u52A1\u5546\u63D0\u4F9B \xB7 \u5E73\u53F0\u5DF2\u5B8C\u6210\u8981\u7D20\u5BA1\u6838</small></span><b>\u67E5\u770B</b></button><div class="p13-contract-steps">' + steps3 + "</div>" + action + "</section>";
  }
  function paymentView(config, second) {
    const amount = second ? config.secondAmount : config.firstAmount;
    return '<section class="p13-stage-head"><span>' + icon("coins", 24) + "</span><div><h1>\u652F\u4ED8" + (second ? "\u7B2C\u4E8C" : "\u7B2C\u4E00") + "\u9636\u6BB5\u670D\u52A1\u6B3E</h1><p>" + (second ? "\u9636\u6BB5\u6210\u679C\u5DF2\u7ECF\u786E\u8BA4\uFF0C\u4ED8\u6B3E\u5230\u8D26\u540E\u56E2\u961F\u7EE7\u7EED\u6B63\u5F0F\u529E\u7406\u3002" : "\u534F\u8BAE\u5DF2\u7ECF\u53CC\u65B9\u7528\u5370\u5E76\u901A\u8FC7\u5E73\u53F0\u5BA1\u6838\uFF0C\u4ED8\u6B3E\u5230\u8D26\u540E\u56E2\u961F\u5F00\u59CB\u670D\u52A1\u3002") + '</p></div></section><section class="p13-panel p13-pay"><div class="p13-pay-amount"><small>\u672C\u6B21\u5E94\u4ED8</small><strong>' + amount + '</strong><span>\u5360\u670D\u52A1\u603B\u4EF7 50%</span></div><div class="p13-pay-row"><span>\u6536\u6B3E\u65B9</span><strong>\u670D\u52A1\u5546\u7B7E\u7EA6\u4E3B\u4F53</strong></div><div class="p13-pay-row"><span>\u652F\u4ED8\u65B9\u5F0F</span><strong>\u7EBF\u4E0B\u5BF9\u516C\u8F6C\u8D26</strong></div><div class="p13-pay-row"><span>\u5E73\u53F0\u804C\u8D23</span><strong>\u8BB0\u5F55\u51ED\u8BC1\u53CA\u5230\u8D26\u786E\u8BA4</strong></div><div class="p13-pay-notice">' + icon("shield", 16) + '<span>\u5F53\u524D\u5E73\u53F0\u4E0D\u4EE3\u6536\u6216\u6258\u7BA1\u8D44\u91D1\uFF0C\u8BF7\u6838\u5BF9\u534F\u8BAE\u4E3B\u4F53\u540E\u76F4\u63A5\u5411\u670D\u52A1\u5546\u4ED8\u6B3E\u3002</span></div><div class="p13-pay-actions"><button class="btn btn-outline" id="p13Account" type="button">\u67E5\u770B\u6536\u6B3E\u4FE1\u606F</button><button class="btn btn-primary" id="p13UploadReceipt" type="button">\u4E0A\u4F20\u4ED8\u6B3E\u51ED\u8BC1</button></div></section>';
  }
  function milestoneView(config) {
    return '<section class="p13-stage-head"><span>' + icon("check-circle", 24) + '</span><div><h1>\u7B2C\u4E00\u9636\u6BB5\u6210\u679C\u5F85\u786E\u8BA4</h1><p>\u670D\u52A1\u5546\u5DF2\u786E\u8BA4\u7B2C\u4E00\u7B14\u6B3E\u9879\u5230\u8D26\uFF0C\u5E76\u63D0\u4EA4\u7EA6\u5B9A\u7684\u9636\u6BB5\u6210\u679C\u3002</p></div></section><section class="p13-panel p13-milestone"><div class="p13-milestone-title"><div><small>\u9636\u6BB5\u6210\u679C</small><strong>' + escapeHTML(config.milestoneTitle) + "</strong></div><span>\u5F85\u4F60\u786E\u8BA4</span></div>" + renderList(config.firstWork) + '<button class="p13-file-row" id="p13MilestoneFile" type="button">' + icon("file-text", 19) + "<span><strong>\u7B2C\u4E00\u9636\u6BB5\u6210\u679C\u6587\u4EF6.zip</strong><small>\u670D\u52A1\u5546\u63D0\u4EA4 \xB7 \u5DF2\u901A\u8FC7\u5E73\u53F0\u75C5\u6BD2\u626B\u63CF</small></span><b>\u67E5\u770B</b></button><p>" + escapeHTML(config.milestoneDetail) + '</p><div class="p13-pay-actions"><button class="btn btn-outline" id="p13Dispute" type="button">\u6210\u679C\u6709\u5F02\u8BAE</button><button class="btn btn-primary" id="p13ConfirmMilestone" type="button">\u786E\u8BA4\u9636\u6BB5\u6210\u679C</button></div></section>';
  }
  function processingView(config) {
    return '<section class="p13-stage-head"><span>' + icon("clock", 24) + '</span><div><h1>\u6B63\u5F0F\u529E\u7406\u4E2D</h1><p>\u7B2C\u4E8C\u7B14\u670D\u52A1\u6B3E\u5DF2\u7531\u670D\u52A1\u5546\u786E\u8BA4\u5230\u8D26\uFF0C\u9879\u76EE\u5DF2\u8FDB\u5165\u4E3B\u7BA1\u673A\u6784\u5904\u7406\u9636\u6BB5\u3002</p></div></section><section class="p13-panel"><div class="p13-process-timeline"><div class="done"><span>' + icon("check", 12) + '</span><p><strong>\u4E24\u9636\u6BB5\u670D\u52A1\u6B3E\u5DF2\u786E\u8BA4</strong><small>\u4ED8\u6B3E\u51ED\u8BC1\u4E0E\u5230\u8D26\u8BB0\u5F55\u5DF2\u7559\u5B58</small></p></div><div class="done"><span>' + icon("check", 12) + '</span><p><strong>\u5DF2\u5411\u4E3B\u7BA1\u673A\u6784\u6B63\u5F0F\u63D0\u4EA4</strong><small>\u63D0\u4EA4\u56DE\u6267\u53EF\u5728\u670D\u52A1\u8BB0\u5F55\u4E2D\u67E5\u770B</small></p></div><div class="active"><span></span><p><strong>\u7B49\u5F85\u5BA1\u67E5\u6216\u8BC4\u5BA1\u7ED3\u679C</strong><small>\u7ED3\u679C\u548C\u8865\u5145\u6750\u6599\u8981\u6C42\u4F1A\u53CA\u65F6\u540C\u6B65</small></p></div></div><div class="p13-processing-note">' + icon("bell", 17) + '<span>\u6709\u8FDB\u5C55\u65F6\u5C06\u901A\u8FC7\u7AD9\u5185\u6D88\u606F\u3001\u77ED\u4FE1\u548C\u4F01\u4E1A\u5FAE\u4FE1\u901A\u77E5\u4F60\u3002</span></div><button class="btn btn-outline btn-block" id="p13DemoResult" type="button">\u5728 Demo \u4E2D\u67E5\u770B\u7ED3\u679C\u72B6\u6001</button></section>';
  }
  function resultView(config) {
    return '<section class="p13-result-head"><span>' + icon("file-text", 26) + "</span><h1>\u672C\u6B21\u670D\u52A1\u5DE5\u4F5C\u5DF2\u5B8C\u6210</h1><p>" + escapeHTML(config.resultTitle) + '</p></section><section class="p13-panel p13-result"><div class="p13-result-status"><span>\u529E\u7406\u7ED3\u679C</span><strong>\u672A\u83B7\u6279</strong></div><p>' + escapeHTML(config.resultDetail) + '</p><button class="p13-file-row" id="p13ResultFile" type="button">' + icon("file-text", 19) + "<span><strong>" + escapeHTML(config.resultFile) + '</strong><small>\u4E3B\u7BA1\u673A\u6784\u7ED3\u679C\u6587\u4EF6</small></span><b>\u67E5\u770B</b></button><div class="p13-result-rule"><strong>\u8D39\u7528\u7ED3\u7B97\u8BF4\u660E</strong><p>\u4E24\u9636\u6BB5\u5DE5\u4F5C\u5747\u5DF2\u5B8C\u6210\uFF0C\u5DF2\u652F\u4ED8\u670D\u52A1\u8D39\u4E0D\u56E0\u672C\u6B21\u7ED3\u679C\u672A\u83B7\u6279\u9000\u8FD8\u3002\u5982\u8BA4\u4E3A\u670D\u52A1\u5546\u672A\u6309\u534F\u8BAE\u5C65\u7EA6\uFF0C\u53EF\u4EE5\u7533\u8BF7\u5E73\u53F0\u534F\u52A9\u6838\u9A8C\u3002</p></div><div class="p13-result-actions"><button class="btn btn-outline" id="p13Restart" type="button">\u91CD\u65B0\u4F53\u9A8C</button><button class="btn btn-primary" id="p13Support" type="button">\u7533\u8BF7\u5E73\u53F0\u534F\u52A9</button></div></section>';
  }
  var page13 = {
    state: { params: {}, journey: null, team: null, config: null, stage: "intake" },
    render(params = {}) {
      const team = getTeam(params.teamId, store.teams);
      const config = getStagedServiceConfig(params.sku);
      if (!team || !config) return '<div class="empty-state"><div class="empty-title">\u5206\u9636\u6BB5\u670D\u52A1\u4E0D\u5B58\u5728</div></div>';
      const journey = getJourney(params);
      if (params.agreementStatus) journey.agreementStatus = params.agreementStatus;
      const stage = params.stage || journey.stage;
      this.state = { params, journey, team, config, stage };
      let body = "";
      if (stage === "intake") body = intakeView(team, config, journey);
      else if (stage === "proposal") body = proposalView(config);
      else if (stage === "contract") body = contractView(config, journey);
      else if (stage === "firstPayment") body = paymentView(config, false);
      else if (stage === "milestone") body = milestoneView(config);
      else if (stage === "secondPayment") body = paymentView(config, true);
      else if (stage === "processing") body = processingView(config);
      else body = resultView(config);
      return '<div class="p13-page">' + header2() + stepper(stage) + contextCard(team, config) + body + "</div>";
    },
    setStage(stage) {
      this.state.journey.stage = stage;
      refreshActivePage();
    },
    init() {
      showTabBar(false);
      document.getElementById("p13Back").addEventListener("click", goBackToPrevious);
      const { stage, journey, config } = this.state;
      if (stage === "intake") {
        const input = document.getElementById("p13Intake");
        input.addEventListener("input", () => {
          document.getElementById("p13Count").textContent = input.value.length + "/500";
        });
        document.getElementById("p13SubmitIntake").addEventListener("click", () => {
          if (!input.value.trim()) return toast("\u8BF7\u5148\u8865\u5145\u9879\u76EE\u60C5\u51B5");
          journey.intake = input.value.trim();
          this.setStage("proposal");
        });
      } else if (stage === "proposal") {
        const consent = document.getElementById("p13RiskConsent");
        const confirm = document.getElementById("p13ConfirmProposal");
        consent.addEventListener("change", () => {
          confirm.disabled = !consent.checked;
        });
        confirm.addEventListener("click", () => showModal({
          title: "\u786E\u8BA4\u670D\u52A1\u65B9\u6848\uFF1F",
          body: "\u786E\u8BA4\u540E\u5C06\u8FDB\u5165\u534F\u8BAE\u7B7E\u7F72\u3002\u534F\u8BAE\u4F1A\u518D\u6B21\u5217\u660E\u4E24\u7B14\u4ED8\u6B3E\u8282\u70B9\u3001\u9636\u6BB5\u4EA4\u4ED8\u6210\u679C\u548C\u9000\u6B3E\u89C4\u5219\u3002",
          cancelText: "\u518D\u68C0\u67E5\u4E00\u4E0B",
          confirmText: "\u786E\u8BA4\u5E76\u7EE7\u7EED",
          onConfirm: () => this.setStage("contract")
        }));
      } else if (stage === "contract") {
        document.getElementById("p13AgreementPreview").addEventListener("click", () => toast("\u5DF2\u6253\u5F00\u534F\u8BAE\u5B89\u5168\u9884\u89C8"));
        const file = document.getElementById("p13AgreementFile");
        if (file) {
          file.addEventListener("change", () => {
            document.getElementById("p13AgreementFileName").textContent = file.files.length ? file.files[0].name : "\u9009\u62E9\u5DF2\u7528\u5370\u534F\u8BAE\u626B\u63CF\u4EF6";
          });
          document.getElementById("p13SubmitAgreement").addEventListener("click", () => {
            if (!file.files.length) return toast("\u8BF7\u5148\u4E0A\u4F20\u5DF2\u7528\u5370\u534F\u8BAE\u626B\u63CF\u4EF6");
            journey.customerAgreementFile = file.files[0].name;
            journey.agreementStatus = "provider_signing";
            refreshActivePage();
            toast("\u534F\u8BAE\u5DF2\u63D0\u4EA4\uFF0C\u7B49\u5F85\u670D\u52A1\u5546\u7528\u5370");
          });
        }
        const returned = document.getElementById("p13ReturnedAgreement");
        if (returned) returned.addEventListener("click", () => toast("\u5DF2\u6253\u5F00\u53CC\u65B9\u7528\u5370\u670D\u52A1\u534F\u8BAE"));
        const auditResult = document.getElementById("p13AuditResult");
        if (auditResult) auditResult.addEventListener("click", () => {
          journey.agreementStatus = "approved";
          refreshActivePage();
          toast("\u534F\u8BAE\u5DF2\u901A\u8FC7\u5E73\u53F0\u5BA1\u6838");
        });
        const toFirstPayment = document.getElementById("p13ToFirstPayment");
        if (toFirstPayment) toFirstPayment.addEventListener("click", () => this.setStage("firstPayment"));
        if (journey.agreementStatus === "provider_signing" && !journey.providerProgressScheduled) {
          journey.providerProgressScheduled = true;
          setTimeout(() => {
            if (journey.agreementStatus !== "provider_signing") return;
            journey.agreementStatus = "auditing";
            journey.providerProgressScheduled = false;
            refreshActivePage();
            toast("\u670D\u52A1\u5546\u5DF2\u5B8C\u6210\u7528\u5370\uFF0C\u53CC\u65B9\u534F\u8BAE\u5DF2\u8FD4\u56DE");
          }, 1600);
        }
      } else if (stage === "firstPayment" || stage === "secondPayment") {
        const second = stage === "secondPayment";
        document.getElementById("p13Account").addEventListener("click", () => showSheet({ title: "\u670D\u52A1\u5546\u6536\u6B3E\u4FE1\u606F", body: '<div class="p13-account"><div><span>\u6536\u6B3E\u6237\u540D</span><strong>\u670D\u52A1\u5546\u7B7E\u7EA6\u4E3B\u4F53</strong></div><div><span>\u5F00\u6237\u94F6\u884C</span><strong>\u793A\u4F8B\u94F6\u884C\u5317\u4EAC\u5206\u884C</strong></div><div><span>\u94F6\u884C\u8D26\u53F7</span><strong>**** **** **** 6628</strong></div><p>\u8BF7\u4EE5\u5DF2\u7B7E\u7F72\u534F\u8BAE\u4E2D\u7684\u6B63\u5F0F\u6536\u6B3E\u4FE1\u606F\u4E3A\u51C6\u3002</p></div>' }));
        document.getElementById("p13UploadReceipt").addEventListener("click", () => showModal({
          title: "\u4ED8\u6B3E\u51ED\u8BC1\u5DF2\u4E0A\u4F20",
          body: "\u5E73\u53F0\u5DF2\u8BB0\u5F55\u4ED8\u6B3E\u51ED\u8BC1\uFF0C\u670D\u52A1\u5546\u786E\u8BA4\u5230\u8D26\u540E\u4F1A\u8FDB\u5165\u4E0B\u4E00\u9636\u6BB5\u3002Demo \u5C06\u6A21\u62DF\u5B8C\u6210\u5230\u8D26\u786E\u8BA4\u3002",
          cancelText: "\u7A0D\u540E\u67E5\u770B",
          confirmText: "\u67E5\u770B\u786E\u8BA4\u7ED3\u679C",
          onConfirm: () => {
            if (second) journey.secondPaid = true;
            else journey.firstPaid = true;
            this.setStage(second ? "processing" : "milestone");
          }
        }));
      } else if (stage === "milestone") {
        document.getElementById("p13MilestoneFile").addEventListener("click", () => toast("\u5DF2\u6253\u5F00\u7B2C\u4E00\u9636\u6BB5\u6210\u679C\u6587\u4EF6"));
        document.getElementById("p13Dispute").addEventListener("click", () => {
          const overlay = showSheet({ title: "\u63D0\u51FA\u6210\u679C\u5F02\u8BAE", body: '<div class="p13-dispute"><p>\u8BF7\u8BF4\u660E\u9700\u8981\u8865\u5145\u6216\u4FEE\u6539\u7684\u5185\u5BB9\uFF0C\u5E73\u53F0\u4F1A\u540C\u6B65\u7ED9\u670D\u52A1\u5546\u5E76\u4FDD\u7559\u8BB0\u5F55\u3002</p><textarea id="p13DisputeText" maxlength="300" rows="4" placeholder="\u8BF4\u660E\u5177\u4F53\u95EE\u9898"></textarea><button class="btn btn-primary btn-block" id="p13DisputeSubmit" type="button">\u63D0\u4EA4\u5F02\u8BAE</button></div>' });
          overlay.querySelector("#p13DisputeSubmit").addEventListener("click", () => {
            if (!overlay.querySelector("#p13DisputeText").value.trim()) return toast("\u8BF7\u586B\u5199\u5177\u4F53\u95EE\u9898");
            overlay.remove();
            toast("\u5F02\u8BAE\u5DF2\u63D0\u4EA4\uFF0C\u7B2C\u4E8C\u9636\u6BB5\u4ED8\u6B3E\u6682\u4E0D\u89E6\u53D1");
          });
        });
        document.getElementById("p13ConfirmMilestone").addEventListener("click", () => showModal({
          title: "\u786E\u8BA4\u7B2C\u4E00\u9636\u6BB5\u6210\u679C\uFF1F",
          body: "\u786E\u8BA4\u540E\u5C06\u89E6\u53D1\u7B2C\u4E8C\u9636\u6BB5\u670D\u52A1\u6B3E\u3002\u670D\u52A1\u5546\u786E\u8BA4\u5230\u8D26\u540E\uFF0C\u7EE7\u7EED\u6B63\u5F0F\u63D0\u4EA4\u548C\u540E\u7EED\u8DDF\u8FDB\u3002",
          cancelText: "\u7EE7\u7EED\u68C0\u67E5",
          confirmText: "\u786E\u8BA4\u5E76\u8FDB\u5165\u4ED8\u6B3E",
          onConfirm: () => this.setStage("secondPayment")
        }));
      } else if (stage === "processing") {
        document.getElementById("p13DemoResult").addEventListener("click", () => this.setStage("result"));
      } else if (stage === "result") {
        document.getElementById("p13ResultFile").addEventListener("click", () => toast("\u5DF2\u6253\u5F00\u4E3B\u7BA1\u673A\u6784\u7ED3\u679C\u6587\u4EF6"));
        document.getElementById("p13Support").addEventListener("click", () => toast("\u5E73\u53F0\u534F\u52A9\u7533\u8BF7\u5DF2\u63D0\u4EA4"));
        document.getElementById("p13Restart").addEventListener("click", () => {
          journeys.set(stateKey(this.state.params), { stage: "intake", intake: "", agreementStatus: "customer_action", customerAgreementFile: "", providerProgressScheduled: false, firstPaid: false, secondPaid: false });
          this.state.journey = journeys.get(stateKey(this.state.params));
          this.setStage("intake");
        });
      }
    }
  };
  register("p13", page13);

  // src/main.js
  var app = {
    pageStack,
    currentTab: "ecology",
    demoBaseline: null,
    demoScenario: null,
    init() {
      this.initDemoControls();
      this.bindTabBar();
      if (this.demoBaseline) this.setInitialDemoScenario("new");
      this.switchTab("ecology");
    },
    initDemoControls,
    setInitialDemoScenario,
    applyDemoScenario,
    bindTabBar,
    switchTab,
    renderPage,
    clearPageAction,
    mountPageAction,
    setPageContent,
    scrollPageToTop,
    refreshablePages,
    refreshCurrentPage,
    showTabBar,
    icon,
    toast,
    closeAllModals,
    updateBadge,
    renderHome,
    renderActivity,
    renderMine
  };
  connectRouter(app);
  var refreshQueued = false;
  subscribe(() => {
    if (refreshQueued) return;
    refreshQueued = true;
    const schedule = globalThis.queueMicrotask || ((callback) => Promise.resolve().then(callback));
    schedule(() => {
      refreshQueued = false;
      app.refreshCurrentPage();
    });
  });
  document.addEventListener("DOMContentLoaded", () => app.init());
})();
