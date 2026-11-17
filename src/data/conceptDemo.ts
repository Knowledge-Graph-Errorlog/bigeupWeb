// 랜딩 '개념 눌러 보기' 데모용 데이터. 앱에 묶인 콘텐츠 판(frontend src/content/content.json, version 1)의
// 문항별 개념 태그와 선수 관계(concept_links.before)를 그대로 뽑았다. 손으로 고치지 않는다 — 콘텐츠가 바뀌면 다시 뽑는다.
export type DemoConcept = { name: string; subject: string; main: boolean; before: { name: string; subject: string }[] }
export type DemoProblem = { label: string; points: number; concepts: DemoConcept[] }

export const DEMO_PROBLEMS: DemoProblem[] = [
  {
    "label": "2026학년도 수능 23번",
    "points": 2,
    "concepts": [
      {
        "name": "중복순열",
        "subject": "확률과 통계",
        "main": true,
        "before": [
          {
            "name": "계승",
            "subject": "공통수학1"
          },
          {
            "name": "곱의 법칙",
            "subject": "공통수학1"
          },
          {
            "name": "순열",
            "subject": "공통수학1"
          },
          {
            "name": "거듭제곱",
            "subject": "중1"
          }
        ]
      }
    ]
  },
  {
    "label": "2026학년도 수능 26번",
    "points": 3,
    "concepts": [
      {
        "name": "모평균의 신뢰구간",
        "subject": "확률과 통계",
        "main": true,
        "before": [
          {
            "name": "모집단과 표본",
            "subject": "확률과 통계"
          },
          {
            "name": "수학적 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "시행과 사건",
            "subject": "확률과 통계"
          },
          {
            "name": "이산확률변수의 기댓값(평균)",
            "subject": "확률과 통계"
          },
          {
            "name": "정규분포와 표준정규분포의 뜻",
            "subject": "확률과 통계"
          },
          {
            "name": "정규분포의 표준화",
            "subject": "확률과 통계"
          },
          {
            "name": "표본평균의 분포",
            "subject": "확률과 통계"
          },
          {
            "name": "표준정규분포표",
            "subject": "확률과 통계"
          },
          {
            "name": "확률밀도함수의 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수와 확률분포",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수의 분산과 표준편차",
            "subject": "확률과 통계"
          },
          {
            "name": "확률의 기본 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "확률질량함수",
            "subject": "확률과 통계"
          },
          {
            "name": "부분집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합과 무한집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합의 원소의 개수",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 연산",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 원소",
            "subject": "공통수학2"
          },
          {
            "name": "함수의 뜻",
            "subject": "공통수학2"
          },
          {
            "name": "제곱근의 뜻",
            "subject": "중3"
          },
          {
            "name": "거듭제곱",
            "subject": "중1"
          }
        ]
      },
      {
        "name": "신뢰구간의 길이",
        "subject": "확률과 통계",
        "main": false,
        "before": [
          {
            "name": "모집단과 표본",
            "subject": "확률과 통계"
          },
          {
            "name": "모평균의 신뢰구간",
            "subject": "확률과 통계"
          },
          {
            "name": "수학적 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "시행과 사건",
            "subject": "확률과 통계"
          },
          {
            "name": "이산확률변수의 기댓값(평균)",
            "subject": "확률과 통계"
          },
          {
            "name": "정규분포와 표준정규분포의 뜻",
            "subject": "확률과 통계"
          },
          {
            "name": "정규분포의 표준화",
            "subject": "확률과 통계"
          },
          {
            "name": "표본평균의 분포",
            "subject": "확률과 통계"
          },
          {
            "name": "표준정규분포표",
            "subject": "확률과 통계"
          },
          {
            "name": "확률밀도함수의 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수와 확률분포",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수의 분산과 표준편차",
            "subject": "확률과 통계"
          },
          {
            "name": "확률의 기본 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "확률질량함수",
            "subject": "확률과 통계"
          },
          {
            "name": "부분집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합과 무한집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합의 원소의 개수",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 연산",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 원소",
            "subject": "공통수학2"
          },
          {
            "name": "함수의 뜻",
            "subject": "공통수학2"
          },
          {
            "name": "제곱근의 뜻",
            "subject": "중3"
          },
          {
            "name": "거듭제곱",
            "subject": "중1"
          }
        ]
      },
      {
        "name": "표본평균의 분포",
        "subject": "확률과 통계",
        "main": false,
        "before": [
          {
            "name": "모집단과 표본",
            "subject": "확률과 통계"
          },
          {
            "name": "수학적 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "시행과 사건",
            "subject": "확률과 통계"
          },
          {
            "name": "이산확률변수의 기댓값(평균)",
            "subject": "확률과 통계"
          },
          {
            "name": "정규분포와 표준정규분포의 뜻",
            "subject": "확률과 통계"
          },
          {
            "name": "확률밀도함수의 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수와 확률분포",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수의 분산과 표준편차",
            "subject": "확률과 통계"
          },
          {
            "name": "확률의 기본 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "확률질량함수",
            "subject": "확률과 통계"
          },
          {
            "name": "부분집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합과 무한집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합의 원소의 개수",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 연산",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 원소",
            "subject": "공통수학2"
          },
          {
            "name": "함수의 뜻",
            "subject": "공통수학2"
          },
          {
            "name": "제곱근의 뜻",
            "subject": "중3"
          },
          {
            "name": "거듭제곱",
            "subject": "중1"
          }
        ]
      }
    ]
  },
  {
    "label": "2026학년도 수능 29번",
    "points": 4,
    "concepts": [
      {
        "name": "이항분포와 정규분포의 관계",
        "subject": "확률과 통계",
        "main": true,
        "before": [
          {
            "name": "독립시행의 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "사건의 독립과 종속",
            "subject": "확률과 통계"
          },
          {
            "name": "수학적 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "시행과 사건",
            "subject": "확률과 통계"
          },
          {
            "name": "여사건의 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "이산확률변수의 기댓값(평균)",
            "subject": "확률과 통계"
          },
          {
            "name": "이항분포",
            "subject": "확률과 통계"
          },
          {
            "name": "이항분포의 평균과 분산",
            "subject": "확률과 통계"
          },
          {
            "name": "정규분포와 표준정규분포의 뜻",
            "subject": "확률과 통계"
          },
          {
            "name": "조건부확률",
            "subject": "확률과 통계"
          },
          {
            "name": "확률밀도함수의 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수와 확률분포",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수의 분산과 표준편차",
            "subject": "확률과 통계"
          },
          {
            "name": "확률의 기본 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "확률질량함수",
            "subject": "확률과 통계"
          },
          {
            "name": "0 또는 음의 정수인 지수",
            "subject": "대수"
          },
          {
            "name": "부분집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합과 무한집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합의 원소의 개수",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 연산",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 원소",
            "subject": "공통수학2"
          },
          {
            "name": "함수의 뜻",
            "subject": "공통수학2"
          },
          {
            "name": "계승",
            "subject": "공통수학1"
          },
          {
            "name": "곱의 법칙",
            "subject": "공통수학1"
          },
          {
            "name": "순열",
            "subject": "공통수학1"
          },
          {
            "name": "조합",
            "subject": "공통수학1"
          },
          {
            "name": "제곱근의 뜻",
            "subject": "중3"
          },
          {
            "name": "지수법칙(자연수 지수)",
            "subject": "중2"
          },
          {
            "name": "거듭제곱",
            "subject": "중1"
          }
        ]
      },
      {
        "name": "이항분포의 평균과 분산",
        "subject": "확률과 통계",
        "main": false,
        "before": [
          {
            "name": "독립시행의 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "사건의 독립과 종속",
            "subject": "확률과 통계"
          },
          {
            "name": "수학적 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "시행과 사건",
            "subject": "확률과 통계"
          },
          {
            "name": "여사건의 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "이산확률변수의 기댓값(평균)",
            "subject": "확률과 통계"
          },
          {
            "name": "이항분포",
            "subject": "확률과 통계"
          },
          {
            "name": "조건부확률",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수와 확률분포",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수의 분산과 표준편차",
            "subject": "확률과 통계"
          },
          {
            "name": "확률의 기본 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "확률질량함수",
            "subject": "확률과 통계"
          },
          {
            "name": "0 또는 음의 정수인 지수",
            "subject": "대수"
          },
          {
            "name": "부분집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합과 무한집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합의 원소의 개수",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 연산",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 원소",
            "subject": "공통수학2"
          },
          {
            "name": "함수의 뜻",
            "subject": "공통수학2"
          },
          {
            "name": "계승",
            "subject": "공통수학1"
          },
          {
            "name": "곱의 법칙",
            "subject": "공통수학1"
          },
          {
            "name": "순열",
            "subject": "공통수학1"
          },
          {
            "name": "조합",
            "subject": "공통수학1"
          },
          {
            "name": "제곱근의 뜻",
            "subject": "중3"
          },
          {
            "name": "지수법칙(자연수 지수)",
            "subject": "중2"
          },
          {
            "name": "거듭제곱",
            "subject": "중1"
          }
        ]
      },
      {
        "name": "독립시행의 확률",
        "subject": "확률과 통계",
        "main": false,
        "before": [
          {
            "name": "사건의 독립과 종속",
            "subject": "확률과 통계"
          },
          {
            "name": "수학적 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "시행과 사건",
            "subject": "확률과 통계"
          },
          {
            "name": "여사건의 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "조건부확률",
            "subject": "확률과 통계"
          },
          {
            "name": "확률의 기본 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "0 또는 음의 정수인 지수",
            "subject": "대수"
          },
          {
            "name": "부분집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합과 무한집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합의 원소의 개수",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 연산",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 원소",
            "subject": "공통수학2"
          },
          {
            "name": "계승",
            "subject": "공통수학1"
          },
          {
            "name": "곱의 법칙",
            "subject": "공통수학1"
          },
          {
            "name": "순열",
            "subject": "공통수학1"
          },
          {
            "name": "조합",
            "subject": "공통수학1"
          },
          {
            "name": "지수법칙(자연수 지수)",
            "subject": "중2"
          },
          {
            "name": "거듭제곱",
            "subject": "중1"
          }
        ]
      },
      {
        "name": "이항분포",
        "subject": "확률과 통계",
        "main": false,
        "before": [
          {
            "name": "독립시행의 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "사건의 독립과 종속",
            "subject": "확률과 통계"
          },
          {
            "name": "수학적 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "시행과 사건",
            "subject": "확률과 통계"
          },
          {
            "name": "여사건의 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "조건부확률",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수와 확률분포",
            "subject": "확률과 통계"
          },
          {
            "name": "확률의 기본 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "확률질량함수",
            "subject": "확률과 통계"
          },
          {
            "name": "0 또는 음의 정수인 지수",
            "subject": "대수"
          },
          {
            "name": "부분집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합과 무한집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합의 원소의 개수",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 연산",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 원소",
            "subject": "공통수학2"
          },
          {
            "name": "함수의 뜻",
            "subject": "공통수학2"
          },
          {
            "name": "계승",
            "subject": "공통수학1"
          },
          {
            "name": "곱의 법칙",
            "subject": "공통수학1"
          },
          {
            "name": "순열",
            "subject": "공통수학1"
          },
          {
            "name": "조합",
            "subject": "공통수학1"
          },
          {
            "name": "지수법칙(자연수 지수)",
            "subject": "중2"
          },
          {
            "name": "거듭제곱",
            "subject": "중1"
          }
        ]
      },
      {
        "name": "확률의 곱셈정리",
        "subject": "확률과 통계",
        "main": false,
        "before": [
          {
            "name": "수학적 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "시행과 사건",
            "subject": "확률과 통계"
          },
          {
            "name": "조건부확률",
            "subject": "확률과 통계"
          },
          {
            "name": "부분집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합과 무한집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합의 원소의 개수",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 연산",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 원소",
            "subject": "공통수학2"
          }
        ]
      },
      {
        "name": "확률의 덧셈정리",
        "subject": "확률과 통계",
        "main": false,
        "before": [
          {
            "name": "배반사건",
            "subject": "확률과 통계"
          },
          {
            "name": "수학적 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "시행과 사건",
            "subject": "확률과 통계"
          },
          {
            "name": "부분집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합과 무한집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합의 원소의 개수",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 연산",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 원소",
            "subject": "공통수학2"
          }
        ]
      },
      {
        "name": "정규분포의 표준화",
        "subject": "확률과 통계",
        "main": false,
        "before": [
          {
            "name": "수학적 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "시행과 사건",
            "subject": "확률과 통계"
          },
          {
            "name": "이산확률변수의 기댓값(평균)",
            "subject": "확률과 통계"
          },
          {
            "name": "정규분포와 표준정규분포의 뜻",
            "subject": "확률과 통계"
          },
          {
            "name": "확률밀도함수의 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수와 확률분포",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수의 분산과 표준편차",
            "subject": "확률과 통계"
          },
          {
            "name": "확률의 기본 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "확률질량함수",
            "subject": "확률과 통계"
          },
          {
            "name": "부분집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합과 무한집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합의 원소의 개수",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 연산",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 원소",
            "subject": "공통수학2"
          },
          {
            "name": "함수의 뜻",
            "subject": "공통수학2"
          },
          {
            "name": "제곱근의 뜻",
            "subject": "중3"
          },
          {
            "name": "거듭제곱",
            "subject": "중1"
          }
        ]
      },
      {
        "name": "표준정규분포표",
        "subject": "확률과 통계",
        "main": false,
        "before": [
          {
            "name": "수학적 확률",
            "subject": "확률과 통계"
          },
          {
            "name": "시행과 사건",
            "subject": "확률과 통계"
          },
          {
            "name": "이산확률변수의 기댓값(평균)",
            "subject": "확률과 통계"
          },
          {
            "name": "정규분포와 표준정규분포의 뜻",
            "subject": "확률과 통계"
          },
          {
            "name": "확률밀도함수의 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수와 확률분포",
            "subject": "확률과 통계"
          },
          {
            "name": "확률변수의 분산과 표준편차",
            "subject": "확률과 통계"
          },
          {
            "name": "확률의 기본 성질",
            "subject": "확률과 통계"
          },
          {
            "name": "확률질량함수",
            "subject": "확률과 통계"
          },
          {
            "name": "부분집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합과 무한집합",
            "subject": "공통수학2"
          },
          {
            "name": "유한집합의 원소의 개수",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 연산",
            "subject": "공통수학2"
          },
          {
            "name": "집합의 원소",
            "subject": "공통수학2"
          },
          {
            "name": "함수의 뜻",
            "subject": "공통수학2"
          },
          {
            "name": "제곱근의 뜻",
            "subject": "중3"
          },
          {
            "name": "거듭제곱",
            "subject": "중1"
          }
        ]
      }
    ]
  }
]
