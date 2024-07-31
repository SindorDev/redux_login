/* eslint-disable no-unused-vars */
import { useFetch } from "../../hooks/useFetch";
import { Fragment, useCallback, useEffect, useState } from "react";
import CardComponent from "../../components/card/Card";
import { useSelector } from "react-redux";
import { Checkbox, Input, Collapse, InputNumber } from "antd";
import CategoryList from "../../components/categoryList/CategoryList";
import Navbar from "../../components/nav/Navbar";
import Message from "../../components/message/Message";
import { Loading } from "../../utils/index";
const { Panel } = Collapse;
const Home = () => {
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [categoryValue, setCategoryValue] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const { username } = useSelector((state) => state.user) || "";
  const [data] = useFetch("/product/product-type");
  const cat = categoryValue?.map((item) => `type=${item}`).join("&")
  const [{ payload }, isLoading] = useFetch(
    `/product/${
      categoryValue.length > 0 ? `by?${cat}` : "most-popular"
    }${min ? `&min_price
      =${min}` : ""}${max ? `&max_price=${max}` : ""}`,
    trigger
  );

  useEffect(() => {
    setTrigger(!trigger);
  }, [min, max])

  const handleType = (checkedValues) => {
    setCategoryValue(checkedValues);
  };

  const plainOptions = data?.payload?.map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Message />
        <CategoryList />

        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-start gap-8">
            <div
              style={{
                width: "100%",
                maxWidth: 200,
                padding: 5,
                border: "1px solid #f0f0f0",
                borderRadius: 4,
              }}
            >
              <Collapse defaultActiveKey={["1", "2", "3"]}>
                <Panel header="Category" key="1">
                  <Checkbox.Group
                    onChange={handleType}
                    options={plainOptions}
                  />
                </Panel>
                <Panel header="Price Range" key="2">
                  {
                    <>
                      <Input.Group compact>
                        <InputNumber
                          min={100}
                          max={1200}
                          defaultValue={100}
                          onChange={(value) => setMin(value)}
                          style={{
                            width: "100%",
                            display: "flex",
                            textAlign: "center",
                          }}
                          placeholder="Min"
                        />

                        <InputNumber
                          min={100}
                          max={1200}
                          defaultValue={1200}
                          onChange={(value) => setMax(value)}
                          style={{
                            width: "100%",
                            textAlign: "center",
                            borderLeft: 0,
                          }}
                          placeholder="Max"
                        />
                      </Input.Group>
                    </>
                  }
                </Panel>
              </Collapse>
            </div>

            <div className="grid grid-cols-3 mx-auto gap-5">
              {isLoading ? (
                <Loading />
              ) : (
                payload?.map((product) => (
                  <Fragment key={product._id}>
                    <CardComponent
                      product={product}
                      trigger={trigger}
                      setTrigger={setTrigger}
                      username={username}
                    />
                  </Fragment>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
