"use client";
import "./MindmapFlow.scss";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import TextUpdaterNode from "../TextUpdaterNode/TextUpdaterNode";
import TextUpdaterRoot from "../TextUpdaterRoot/TextUpdaterRoot";

const AddNodeOnEdgeDrop = ({ nodes: nodesGet, edges: edgesGet, nodeId }) => {
  const [keyCode, setKeyCode] = useState("Backspace");
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    nodesGet
      ? nodesGet
      : [
          {
            id: "0",
            type: "rootUpdater",
            data: { label: "My Mindmap" },
            position: { x: 0, y: 50 },
          },
        ]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    edgesGet ? edgesGet : []
  );
  const id = useRef(nodeId ? nodeId : 1);
  const { screenToFlowPosition } = useReactFlow();

  const getId = () => `${id.current++}`;

  const onConnect = useCallback((params) => {
    // reset the start node on connections
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const newNode = {
          id,
          type: "textUpdater",
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: {
            label: `Text ${id}`,
            isChange: false,
          },
          origin: [0.5, 0.0],
        };
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [screenToFlowPosition]
  );

  const onNodeClick = (event, node) => {
    if (node.id === "0") {
      setKeyCode("");
    } else {
      setKeyCode("Backspace");
    }
  };

  const onSelectionChange = ({ nodes }) => {
    const checkSelection = Array.from(nodes).every((node) => node.id !== "0");
    if (checkSelection) {
      setKeyCode("Backspace");
    } else {
      setKeyCode("");
    }
  };

  const nodeTypes = useMemo(
    () => ({ textUpdater: TextUpdaterNode, rootUpdater: TextUpdaterRoot }),
    []
  );

  const onNodeDoubleClick = (event, node) => {
    const newNodes = Array.from(nodes).map((item) => {
      if (item.id === node.id) {
        const nodeChange = {
          ...item,
          data: { ...node.data, isChange: true },
        };
        return nodeChange;
      }
      return item;
    });
    setNodes(newNodes);
  };

  useEffect(() => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
    localStorage.setItem("nodeId", id.current);
  }, [nodes, edges]);

  return (
    <div
      className="wrapper"
      ref={reactFlowWrapper}
      style={{ width: "100%", height: "70vh" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onNodeClick={onNodeClick}
        deleteKeyCode={keyCode}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        onNodeDoubleClick={onNodeDoubleClick}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

function MindmapFlow({ nodes, edges, nodeId }) {
  return (
    <ReactFlowProvider>
      <AddNodeOnEdgeDrop nodes={nodes} edges={edges} nodeId={nodeId} />
    </ReactFlowProvider>
  );
}

export default MindmapFlow;
