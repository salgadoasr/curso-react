import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

// No necesario, pero cómodo
global.shallow = Enzyme.shallow;
global.mount = Enzyme.mount;
global.render = Enzyme.render;
