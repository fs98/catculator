import { TiSocialGithub } from "react-icons/ti";

export const Header = (): JSX.Element => (
  <header>
    <nav className="h-12 container mx-auto flex justify-between">
      <a
        href="/"
        className="py-3 flex items-center content-start text-gray-500 hover:opacity-75"
      >
        Catculator by Fata
      </a>

      <ul className="flex items-center space-x-2">
        <li>
          <a
            href="https://github.com/fs98/catculator"
            target="_blank"
            rel="noreferrer"
          >
            <TiSocialGithub color="#333" size="32" />
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
