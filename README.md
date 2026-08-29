# 낚행 (Nakhaeng)

낚시와 여행을 함께 기록하는 커뮤니티. Next.js 14 + Supabase로 만든 실제 작동
가능한 웹 애플리케이션입니다.

## 포함된 기능

- 이메일 회원가입 / 로그인 (Supabase Auth)
- 조행기 게시글 작성 · 목록 (낚시 / 여행 카테고리)
- 실시간 정보공유방 (Supabase Realtime)
- 한국의 명산 50선 목록 + 상세 모달 + 인접 낚시 포인트
- 한반도 윤곽 SVG 지도에 포인트 표시

## 1. 로컬에서 실행하기

```bash
npm install
cp .env.local.example .env.local   # 아래 2번에서 발급받은 값 입력
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있어요.

## 2. Supabase 프로젝트 만들기 (무료)

1. https://supabase.com 에서 새 프로젝트 생성
2. 프로젝트의 **SQL Editor**를 열고, 이 저장소의 `supabase/schema.sql` 내용을
   그대로 붙여넣어 실행 (테이블, 보안 정책, 실시간 기능이 한 번에 설정돼요)
3. **Project Settings → API** 에서 `Project URL` 과 `anon public` 키를 복사해
   `.env.local` 에 채워넣기

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 3. 실제 웹사이트로 배포하기 (Vercel, 무료)

1. 이 프로젝트를 GitHub 저장소로 올리기
2. https://vercel.com 에서 "Import Project"로 그 저장소 선택
3. 위 2번의 환경변수 2개를 Vercel의 Environment Variables에 동일하게 입력
4. Deploy 클릭 → 몇 분 뒤 `xxx.vercel.app` 주소로 접속 가능

## 4. 커스텀 도메인 연결하기

가비아, 후이즈 등에서 원하는 도메인을 구매한 뒤, Vercel 프로젝트의
**Settings → Domains** 에서 해당 도메인을 추가하고 안내되는 DNS 레코드를
구매처에 등록하면 연결됩니다.

## 다음 단계로 고려해볼 것들

- **지도 정밀도**: 현재 SVG 지도는 단순화된 일러스트예요. 실제 서비스에서는
  카카오맵/네이버지도 API로 교체하는 걸 권장해요.
- **명산 50선 데이터**: 높이·지역·설명은 일반 지식을 바탕으로 작성한 것이라
  국립공원공단·산림청 등 공식 자료로 검증이 필요해요.
- **도배/신고 방지**: 정보공유방과 게시글에 스팸 방지, 신고, 차단 기능을
  추가하는 걸 권장해요.
- **이미지 업로드**: 지금은 그라디언트 플레이스홀더예요. Supabase Storage로
  실제 사진 업로드 기능을 붙일 수 있어요.
