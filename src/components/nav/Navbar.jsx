import { BsBell } from "react-icons/bs"; 
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import axios from "../../api/data";
import { useFetch } from "../../hooks/useFetch"
import { BiCartAlt } from "react-icons/bi";
import { AutoComplete, Avatar, Badge } from "antd";

const Navbar = () => {
  const [searchData, setSearchData] = useState({
    payload: [],
  });

  const [{payload}] = useFetch("notifications/all")
  const loadData = async (searchText) => {
    const response = await axios(`/product/search/${searchText}`);
    setSearchData(response.data);
  };

  return (
    <header className="bg-white min-h-[80px] rounded-xl mb-[10px] shadow">
      <div className="max-w-[1400px] py-[15px] mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-center text-gray-900">Home</h1>

          <div>
            <AutoComplete
              options={searchData.payload?.map((item) => {
                return {
                  value: (
                    <Link to={`/productDetails/${item._id}`}>
                      {item.product_name}
                    </Link>
                  ),
                };
              })}
              style={{
                width: 400,
                background: "#f1f1f1",
              }}
              onSearch={(text) =>
                text
                  ? loadData(text)
                  : setSearchData({
                      payload: [],
                    })
              }
              placeholder="Enter Product Name"
            />
          </div>
          <ul className="flex items-center gap-5">
            <li>
              <NavLink
                className="px-5 py-1 bg-teal-600 text-white rounded-lg"
                to={"/auth"}
              >
                Login In
              </NavLink>
            </li>

            <li>
              <NavLink
                className="px-5 py-1 bg-teal-600 text-white rounded-lg"
                to={"/Dashboard"}
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                className="px-5 py-1 bg-teal-600 text-white rounded-lg"
                to={"/Dashboard/profile"}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={"/Dashboard/productCart"} className="ml-[10px]">
                <Badge>
                  <Avatar shape="square" size="normal">
                    <BiCartAlt size={20} />
                  </Avatar>
                </Badge>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/Dashboard/notifications"}>
              <Badge count={payload?.length} overflowCount={9}>
                  <BsBell size={25} />
              </Badge>
              </NavLink>

            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
