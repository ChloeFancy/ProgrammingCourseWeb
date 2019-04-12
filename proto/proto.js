/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  protocol: {
    options: {
      go_package: "protocol;protocol"
    },
    nested: {
      AnnouncementsReq: {
        fields: {
          pageIndex: {
            type: "int64",
            id: 1
          },
          pageNum: {
            type: "int64",
            id: 2
          }
        }
      },
      AnnouncementsResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          announcements: {
            rule: "repeated",
            type: "Announcement",
            id: 2
          },
          pageIndex: {
            type: "int64",
            id: 3
          },
          pageNum: {
            type: "int64",
            id: 4
          },
          total: {
            type: "int64",
            id: 5
          }
        }
      },
      AnnouncementDetailReq: {
        fields: {
          id: {
            type: "int64",
            id: 1
          }
        }
      },
      AnnouncementDetailResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          announcement: {
            type: "Announcement",
            id: 2
          }
        }
      },
      AddAnnouncementReq: {
        fields: {
          announcement: {
            type: "Announcement",
            id: 1
          }
        }
      },
      AddAnnouncementResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          isSuccess: {
            type: "bool",
            id: 2
          }
        }
      },
      EditAnnouncementReq: {
        fields: {
          announcement: {
            type: "Announcement",
            id: 1
          }
        }
      },
      EditAnnouncementResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          isSuccess: {
            type: "bool",
            id: 2
          }
        }
      },
      DelAnnouncementReq: {
        fields: {
          id: {
            type: "int64",
            id: 1
          }
        }
      },
      DelAnnouncementResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          isSuccess: {
            type: "bool",
            id: 2
          }
        }
      },
      GetClassesReq: {
        fields: {
          pageIndex: {
            type: "int64",
            id: 1
          },
          pageNum: {
            type: "int64",
            id: 2
          }
        }
      },
      GetClassesResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          classes: {
            rule: "repeated",
            type: "Class",
            id: 2
          },
          pageIndex: {
            type: "int64",
            id: 3
          },
          pageNum: {
            type: "int64",
            id: 4
          },
          total: {
            type: "int64",
            id: 5
          }
        }
      },
      GetClassByIDReq: {
        fields: {
          id: {
            type: "int64",
            id: 1
          }
        }
      },
      GetClassByIDResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          "class": {
            type: "Class",
            id: 2
          }
        }
      },
      AddClassReq: {
        fields: {
          "class": {
            type: "Class",
            id: 1
          }
        }
      },
      AddClassResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          isSuccess: {
            type: "bool",
            id: 2
          }
        }
      },
      EditClassReq: {
        fields: {
          "class": {
            type: "Class",
            id: 1
          }
        }
      },
      EditClassResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          isSuccess: {
            type: "bool",
            id: 2
          }
        }
      },
      MemberManageReq: {
        fields: {
          manageType: {
            type: "ManageType",
            id: 1
          },
          classId: {
            type: "int64",
            id: 2
          },
          memberId: {
            type: "int64",
            id: 3
          }
        },
        nested: {
          ManageType: {
            values: {
              DELETE: 0,
              SET_ADMINISTRATOR: 1,
              CANCEL_ADMINISTRATOR: 2
            }
          }
        }
      },
      MemberManageResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          isSuccess: {
            type: "bool",
            id: 2
          }
        }
      },
      Role: {
        values: {
          STUDENT: 0,
          TEACHER: 1,
          MANAGER: 2
        }
      },
      UserInfo: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          role: {
            type: "Role",
            id: 4
          },
          name: {
            type: "string",
            id: 5
          },
          sex: {
            type: "bool",
            id: 6
          },
          phone: {
            type: "string",
            id: 7
          },
          email: {
            type: "string",
            id: 8
          },
          school: {
            type: "string",
            id: 9
          },
          lastLogin: {
            type: "int64",
            id: 10
          },
          create: {
            type: "int64",
            id: 11
          },
          account: {
            type: "string",
            id: 2
          },
          password: {
            type: "string",
            id: 3
          }
        }
      },
      ProblemExample: {
        fields: {
          input: {
            type: "string",
            id: 1
          },
          output: {
            type: "string",
            id: 2
          }
        }
      },
      Problem: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          description: {
            type: "string",
            id: 3
          },
          "in": {
            type: "string",
            id: 4
          },
          out: {
            type: "string",
            id: 5
          },
          hint: {
            type: "string",
            id: 6
          },
          inOutExamples: {
            rule: "repeated",
            type: "ProblemExample",
            id: 7
          },
          judgeLimitTime: {
            type: "int64",
            id: 8
          },
          judgeLimitMem: {
            type: "int64",
            id: 9
          },
          tags: {
            rule: "repeated",
            type: "int64",
            id: 10
          },
          difficulty: {
            type: "int64",
            id: 11
          },
          cognition: {
            type: "int64",
            id: 12
          },
          submitTime: {
            type: "int64",
            id: 13
          },
          acceptTime: {
            type: "int64",
            id: 14
          }
        }
      },
      SubmitRecord: {
        fields: {
          problem: {
            type: "Problem",
            id: 1
          },
          submitTime: {
            type: "int64",
            id: 2
          },
          isPass: {
            type: "bool",
            id: 3
          }
        }
      },
      Announcement: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          publisher: {
            type: "string",
            id: 2
          },
          title: {
            type: "string",
            id: 3
          },
          detail: {
            type: "string",
            id: 4
          },
          createTime: {
            type: "int64",
            id: 5
          },
          lastUpdateTime: {
            type: "int64",
            id: 6
          }
        }
      },
      Class: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          tutor: {
            type: "string",
            id: 2
          },
          name: {
            type: "string",
            id: 3
          },
          introduction: {
            type: "string",
            id: 4
          },
          number: {
            type: "int64",
            id: 5
          },
          isCheck: {
            type: "bool",
            id: 6
          },
          createTime: {
            type: "int64",
            id: 7
          },
          announcements: {
            rule: "repeated",
            type: "Announcement",
            id: 8
          }
        }
      },
      RankItem: {
        fields: {
          ranking: {
            type: "int64",
            id: 1
          },
          userId: {
            type: "int64",
            id: 2
          },
          name: {
            type: "string",
            id: 3
          },
          passNum: {
            type: "int64",
            id: 4
          },
          submitNum: {
            type: "int64",
            id: 5
          }
        }
      },
      Paper: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          problems: {
            rule: "repeated",
            type: "Problem",
            id: 2
          },
          difficulty: {
            keyType: "int64",
            type: "int64",
            id: 3
          },
          knowledgePoints: {
            keyType: "int64",
            type: "int64",
            id: 4
          },
          cognition: {
            keyType: "int64",
            type: "int64",
            id: 5
          }
        }
      },
      Match: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          isPublic: {
            type: "bool",
            id: 2
          },
          startTime: {
            type: "int64",
            id: 3
          },
          duration: {
            type: "int64",
            id: 4
          },
          isOver: {
            type: "bool",
            id: 5
          },
          name: {
            type: "string",
            id: 6
          },
          intriduction: {
            type: "string",
            id: 7
          },
          paperId: {
            type: "int64",
            id: 8
          }
        }
      },
      Config: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          cognition: {
            keyType: "int64",
            type: "string",
            id: 2
          },
          tags: {
            keyType: "int64",
            type: "string",
            id: 3
          },
          difficulty: {
            keyType: "int64",
            type: "string",
            id: 4
          }
        }
      },
      Language: {
        values: {
          C: 0,
          C_PLUS: 1,
          JAVA: 2,
          PYTHON2: 3,
          PYTHON3: 4
        }
      },
      JudgeResult: {
        fields: {
          judgeResult: {
            type: "Result",
            id: 2
          },
          cpuTime: {
            type: "int64",
            id: 3
          },
          realTime: {
            type: "int64",
            id: 4
          },
          memory: {
            type: "int64",
            id: 5
          },
          signal: {
            type: "int64",
            id: 6
          },
          exitCode: {
            type: "int64",
            id: 7
          }
        },
        nested: {
          Result: {
            values: {
              SUCCESS: 0,
              WRONG_ANSWER: -1,
              CPU_TIME_LIMIT_EXCEEDED: 1,
              REAL_TIME_LIMIT_EXCEEDED: 2,
              MEMORY_LIMIT_EXCEEDED: 3,
              RUNTIME_ERROR: 4,
              SYSTEM_ERROR: 5
            }
          }
        }
      },
      JudgeRequest: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          src: {
            type: "string",
            id: 2
          },
          language: {
            type: "Language",
            id: 3
          }
        }
      },
      JudgeResponse: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          results: {
            rule: "repeated",
            type: "JudgeResult",
            id: 2
          }
        }
      },
      LoginReq: {
        fields: {
          account: {
            type: "string",
            id: 2
          },
          password: {
            type: "string",
            id: 3
          }
        }
      },
      LoginResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          token: {
            type: "string",
            id: 2
          },
          user: {
            type: "UserInfo",
            id: 3
          },
          submitRecords: {
            rule: "repeated",
            type: "SubmitRecord",
            id: 4
          }
        }
      },
      LogoutResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          }
        }
      },
      NewMatchReq: {
        fields: {
          paper: {
            type: "Paper",
            id: 1
          },
          match: {
            type: "Match",
            id: 2
          }
        }
      },
      NewMatchResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          result: {
            type: "bool",
            id: 2
          }
        }
      },
      GetMatchesReq: {
        fields: {
          pageIndex: {
            type: "int64",
            id: 1
          },
          pageNum: {
            type: "int64",
            id: 2
          }
        }
      },
      GetMatchesResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          pageIndex: {
            type: "int64",
            id: 2
          },
          pageNum: {
            type: "int64",
            id: 3
          },
          total: {
            type: "int64",
            id: 4
          },
          matches: {
            rule: "repeated",
            type: "Match",
            id: 5
          }
        }
      },
      GetMatchByIDReq: {
        fields: {
          id: {
            type: "int64",
            id: 1
          }
        }
      },
      GetMatchByIDResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          match: {
            type: "Match",
            id: 5
          }
        }
      },
      GetPaperByIDReq: {
        fields: {
          id: {
            type: "int64",
            id: 1
          }
        }
      },
      GetPaperByIDResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          paper: {
            type: "Paper",
            id: 2
          }
        }
      },
      EditMatchReq: {
        fields: {
          match: {
            type: "Match",
            id: 1
          }
        }
      },
      EditMatchResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          isOk: {
            type: "bool",
            id: 2
          }
        }
      },
      GetProblemsReq: {
        fields: {
          tag: {
            type: "int64",
            id: 1
          },
          getAll: {
            type: "bool",
            id: 2
          },
          pageIndex: {
            type: "int64",
            id: 3
          },
          pageNum: {
            type: "int64",
            id: 4
          }
        }
      },
      GetProblemsResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          problems: {
            rule: "repeated",
            type: "Problem",
            id: 2
          },
          pageIndex: {
            type: "int64",
            id: 3
          },
          pageNum: {
            type: "int64",
            id: 4
          },
          total: {
            type: "int64",
            id: 5
          }
        }
      },
      GetProblemByIDReq: {
        fields: {
          id: {
            type: "int64",
            id: 1
          }
        }
      },
      GetProblemByIDResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          problem: {
            type: "Problem",
            id: 2
          }
        }
      },
      AddProblemReq: {
        fields: {
          problem: {
            type: "Problem",
            id: 1
          }
        }
      },
      AddProblemResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          isSuccess: {
            type: "bool",
            id: 2
          }
        }
      },
      EditProblemReq: {
        fields: {
          problem: {
            type: "Problem",
            id: 1
          }
        }
      },
      EditProblemResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          isSuccess: {
            type: "bool",
            id: 2
          }
        }
      },
      RankListReq: {
        fields: {
          pageIndex: {
            type: "int64",
            id: 1
          },
          pageNum: {
            type: "int64",
            id: 2
          }
        }
      },
      RankListResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          rankItems: {
            rule: "repeated",
            type: "RankItem",
            id: 2
          },
          pageIndex: {
            type: "int64",
            id: 3
          },
          pageNum: {
            type: "int64",
            id: 4
          },
          total: {
            type: "int64",
            id: 5
          },
          pos: {
            type: "int64",
            id: 6
          }
        }
      },
      Status: {
        fields: {
          code: {
            type: "Code",
            id: 1
          },
          message: {
            type: "string",
            id: 2
          }
        }
      },
      Code: {
        values: {
          OK: 0,
          INTERNAL: 1,
          DATA_LOSE: 2,
          NO_TOKEN: 3,
          UNAUTHORIZATED: 4,
          PERMISSION_DENIED: 5
        }
      },
      GetUsersReq: {
        fields: {
          role: {
            type: "Role",
            id: 1
          },
          getAll: {
            type: "bool",
            id: 2
          },
          pageIndex: {
            type: "int64",
            id: 3
          },
          pageNum: {
            type: "int64",
            id: 4
          }
        }
      },
      GetUsersResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          users: {
            rule: "repeated",
            type: "UserInfo",
            id: 2
          },
          pageIndex: {
            type: "int64",
            id: 3
          },
          pageNum: {
            type: "int64",
            id: 4
          },
          total: {
            type: "int64",
            id: 5
          }
        }
      },
      AddUsersReq: {
        fields: {
          users: {
            rule: "repeated",
            type: "UserInfo",
            id: 1
          }
        }
      },
      AddUsersResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          succeed: {
            rule: "repeated",
            type: "UserInfo",
            id: 2
          },
          fail: {
            rule: "repeated",
            type: "UserInfo",
            id: 3
          }
        }
      },
      UpdateUsersReq: {
        fields: {
          users: {
            rule: "repeated",
            type: "UserInfo",
            id: 1
          }
        }
      },
      UpdateUsersResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          succeed: {
            rule: "repeated",
            type: "UserInfo",
            id: 2
          },
          fail: {
            rule: "repeated",
            type: "UserInfo",
            id: 3
          }
        }
      },
      DelUsersReq: {
        fields: {
          usersId: {
            rule: "repeated",
            type: "int64",
            id: 1
          }
        }
      },
      DelUsersResp: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          succeed: {
            rule: "repeated",
            type: "int64",
            id: 2
          },
          fail: {
            rule: "repeated",
            type: "int64",
            id: 3
          }
        }
      }
    }
  }
});

module.exports = $root;
