# Vercel 배포 가이드

## 배포 방법

### 방법 1: Vercel 웹사이트를 통한 배포 (권장)

1. **GitHub에 프로젝트 푸시**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Vercel에 로그인**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

3. **프로젝트 Import**
   - "Add New..." → "Project" 클릭
   - GitHub 저장소 선택
   - Vercel이 자동으로 Next.js 프로젝트 감지

4. **배포 설정**
   - Framework Preset: Next.js (자동 감지)
   - Root Directory: `./` (기본값)
   - Build Command: `npm run build` (자동 설정)
   - Output Directory: `.next` (자동 설정)

5. **배포 실행**
   - "Deploy" 버튼 클릭
   - 배포 완료 후 URL 제공

### 방법 2: Vercel CLI를 통한 배포

1. **Vercel CLI 설치**
   ```bash
   npm i -g vercel
   ```

2. **로그인**
   ```bash
   vercel login
   ```

3. **배포**
   ```bash
   vercel
   ```

4. **프로덕션 배포**
   ```bash
   vercel --prod
   ```

## 빌드 전 확인사항

1. **환경 변수 확인**
   - 필요한 환경 변수가 있다면 Vercel 대시보드에서 설정

2. **이미지 최적화**
   - `public/images/` 폴더의 이미지들이 포함되어 있는지 확인
   - 큰 이미지 파일은 Git LFS 사용 고려

3. **의존성 확인**
   - `package.json`의 모든 의존성이 올바른지 확인

## 배포 후 확인사항

- [ ] 지도 이미지가 정상적으로 로드되는지 확인
- [ ] 마커가 정상적으로 표시되는지 확인
- [ ] 모달이 정상적으로 작동하는지 확인
- [ ] 반응형 디자인이 모바일에서도 작동하는지 확인

## 문제 해결

### 빌드 에러 발생 시
- Vercel 대시보드의 빌드 로그 확인
- 로컬에서 `npm run build` 실행하여 에러 확인

### 이미지가 로드되지 않는 경우
- `public` 폴더의 파일들이 Git에 포함되어 있는지 확인
- 이미지 경로가 올바른지 확인

