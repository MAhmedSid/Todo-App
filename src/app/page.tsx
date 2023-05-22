import { TodoComp } from "../components/layout/TodoComp";
import MainWrapper from "../components/wrappers/MainWrapper";



export default function Home() {
  return (
    <main className="h-[100vh] md:w-[100vw]  text-white">
      <MainWrapper>
        {/* @ts-ignore */}
        <TodoComp />
      </MainWrapper>
    </main>
  );
}
