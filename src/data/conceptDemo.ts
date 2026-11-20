// 랜딩 '문제에 쓰인 개념' 장면용 데이터. 앱에 묶인 콘텐츠 판(frontend src/content/content.json, version 1)에서
// 2023학년도 수능 확률과 통계 28번의 개념 태그와 선수 관계(concept_links.before를 끝까지 따라간 것)를 그대로 뽑았다.
// 손으로 고치지 않는다 — 콘텐츠가 바뀌면 다시 뽑는다.
export type DemoConcept = { id: string; name: string; subject: string; main: boolean; before: { name: string; subject: string }[] }
export type DemoProblem = { label: string; subject: string; points: number; concepts: DemoConcept[] }

export const DEMO_PROBLEM: DemoProblem = {
  "label": "2023학년도 수능 28번",
  "subject": "확률과 통계",
  "points": 4,
  "concepts": [
    {
      "id": "C0291",
      "name": "확률밀도함수의 성질",
      "subject": "확률과 통계",
      "main": true,
      "before": [
        {
          "name": "확률변수와 확률분포",
          "subject": "확률과 통계"
        },
        {
          "name": "함수의 뜻",
          "subject": "공통수학2"
        },
        {
          "name": "수학적 확률",
          "subject": "확률과 통계"
        },
        {
          "name": "집합의 원소",
          "subject": "공통수학2"
        },
        {
          "name": "시행과 사건",
          "subject": "확률과 통계"
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
          "name": "유한집합과 무한집합",
          "subject": "공통수학2"
        },
        {
          "name": "부분집합",
          "subject": "공통수학2"
        }
      ]
    },
    {
      "id": "C0448",
      "name": "확률의 기본 성질",
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
          "name": "유한집합의 원소의 개수",
          "subject": "공통수학2"
        },
        {
          "name": "집합의 연산",
          "subject": "공통수학2"
        },
        {
          "name": "유한집합과 무한집합",
          "subject": "공통수학2"
        },
        {
          "name": "부분집합",
          "subject": "공통수학2"
        },
        {
          "name": "집합의 원소",
          "subject": "공통수학2"
        }
      ]
    },
    {
      "id": "C0057",
      "name": "직선의 방정식",
      "subject": "공통수학2",
      "main": false,
      "before": [
        {
          "name": "일차함수의 그래프의 기울기",
          "subject": "중2"
        },
        {
          "name": "순서쌍과 좌표",
          "subject": "중1"
        },
        {
          "name": "정수와 유리수",
          "subject": "중1"
        }
      ]
    }
  ]
}
