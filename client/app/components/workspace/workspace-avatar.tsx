interface Props {
  color: string;
  name: string;
  size?: number;
}
const WorkspaceAvatar = ({ color, name, size = 8 }: Props) => {
  return (
    <div
      className={`size-${size} rounded flex items-center justify-center`}
      style={{ backgroundColor: color }}
    >
      <span className="text-xs font-medium text-white">
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

export default WorkspaceAvatar;
