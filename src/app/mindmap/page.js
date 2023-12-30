import "../../../public/assets/scss/mindmap.scss";
import AddButton from "./components/AddButton/AddButton";
import MindmapTable from "./components/MindmapTable/MindmapTable";

export const metadata = {
  title: "Mindmap của tôi - Mindmap Flow",
  description: "Mindmap Flow - Công cụ xây dựng sơ đồ tư duy mạnh m",
};

function MindmapPage() {
  return (
    <section id="mindmap">
      <div>
        <h3>My Mindmap</h3>
        <AddButton />
        <MindmapTable />
      </div>
    </section>
  );
}

export default MindmapPage;
