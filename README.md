# GKN TODO LIST APP

이 프로젝트는 글로벌널리지네트워크 사전과제로 개발된 TODO 리스트 애플리케이션입니다. 
Next.js와 Recoil을 사용하여 상태 관리를 구현하였으며, Tailwind CSS로 스타일링되었습니다.

## 목차

- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [주요 기능](#주요-기능)
- [사용된 기술](#사용된-기술)
- [문의](#문의)

## 시작하기

개발 서버를 실행하려면 다음 명령어를 사용하세요:

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
# 또는
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 프로젝트 구조

```
/src
  /app
    - globals.css
    - layout.tsx
    - page.tsx
  /components
    /Board
      - BoardCard.tsx
      - BoardForm.tsx
      - BoardList.tsx
    /Button
      - FormButton.tsx
      - IconButton.tsx
    /DragAndDrop
      - DNDForm.tsx
      - DNDList.tsx
      - DNDListItem.tsx
    /Input
      - ColorPicker.tsx
      - Input.tsx
      - Select.tsx
    /Loader
      - CircleLoader.tsx
    /Modal
      - Modal.tsx
    /Recoil
      - RecoilRootWrapper.tsx
    /Section
      - Section.tsx
    /ToDo
      - ToDoForm.tsx
      - ToDoItem.tsx
      - ToDoList.tsx
  /constants
    - color.ts
    - index.ts
  /data
    - data.ts
```

- **`/app`**: Next.js의 페이지와 레이아웃 파일이 위치합니다.
- **`/components`**: UI 컴포넌트들이 위치합니다. 각 기능별로 디렉토리가 나뉘어 있습니다.
- **`/constants`**: 상수 값들이 정의되어 있습니다.
- **`/data`**: 기본 데이터가 정의되어 있습니다.

## 주요 기능

- **보드 관리**: 보드를 추가, 수정, 삭제할 수 있습니다.
- **TODO 관리**: 각 보드에 할 일을 추가, 수정, 삭제할 수 있습니다.
- **드래그 앤 드롭**: 보드와 할 일의 순서를 드래그 앤 드롭으로 변경할 수 있습니다.
- **필터링**: 완료된 할 일과 미완료된 할 일을 필터링할 수 있습니다.
- **모달**: 보드와 할 일의 수정 Form을 모달로 표시합니다.

## 사용된 기술

- **Next.js & React**
- **Recoil**
- **Tailwind CSS**
- **DND Kit**

## Copyright
- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools

## 문의

프로젝트에 대한 문의 사항이 있으면 다음 이메일로 연락하세요: [chltjdnjs529@gmail.com](mailto:chltjdnjs529@gmail.com)
