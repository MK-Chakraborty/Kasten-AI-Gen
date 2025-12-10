import logo from "../../assets/Logo.png";

export default function Logo() {
  return (
    <a href="./" className="btn btn-link my-2">
      <img src={logo} className="w-[200px]" alt="" />
    </a>
  );
}
