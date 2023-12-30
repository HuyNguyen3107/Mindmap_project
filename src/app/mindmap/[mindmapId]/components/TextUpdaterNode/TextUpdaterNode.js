"use client";
import { useCallback } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import "./TextUpdaterNode.scss";

function TextUpdaterNode({ id, data, isConnectable }) {
  const onChange = useCallback((evt) => {}, []);
  const { setNodes } = useReactFlow();

  const handleChange = (id, value) => {
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, label: value },
          };
        }
        return node;
      });
    });
  };

  const handleBlur = (id) => {
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, isChange: false },
          };
        }
        return node;
      });
    });
  };

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        {data.isChange ? (
          <input
            id="text"
            name="text"
            onChange={(e) => {
              handleChange(id, e.target.value);
            }}
            className="nodrag"
            autoFocus
            defaultValue={data.label}
            onBlur={() => {
              // data.onBlur(id);
              handleBlur(id);
            }}
          />
        ) : (
          <p>{data.label}</p>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
