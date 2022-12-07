import Layout from "../../components/UI/Layout/Layout";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import {
  apiBaseAddressState,
  apiTokenState,
} from "../../states/global/globalState";
import axios from "axios";
import { useEffect, useState } from "react";

const StoreOpenTime = [
  { day: "월요일", openTime: "", closeTime: "" },
  { day: "화요일", openTime: "", closeTime: "" },
  { day: "수요일", openTime: "", closeTime: "" },
  { day: "목요일", openTime: "", closeTime: "" },
  { day: "금요일", openTime: "", closeTime: "" },
  { day: "토요일", openTime: "", closeTime: "" },
  { day: "일요일", openTime: "", closeTime: "" },
];

const StoreRegisterModalItemContainer = styled.div`
  width: 100%;
`;
const StoreRegisterModalItemLabel = styled.div`
  @media screen and (max-width: 640px) {
    font-size: 11px;
  }
`;

const StoreTagItemButton = styled.button`
  padding: 1px 5px;
  font-weight: 400;
  color: #595959;
  border-radius: 10px;
  border: 1px solid #595959;
  :hover {
    color: black;
  }
`;
const StoreTagSelected = styled.div`
  padding: 1px 5px;
  font-weight: 400;
  color: black;
  border-radius: 10px;
  background-color: #a1d2ff;
  border: 1px solid #5cb0ff;
  :hover {
    color: black;
  }
`;

export default function MarketEdit() {
  const BASEURL = useRecoilValue(apiBaseAddressState);

  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: `${BASEURL}/api/v1/stores`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log(res.data);
      setStoreList(res.data);
    });
  }, [BASEURL]);

  const renderStoreEdit = () => {};

  return (
    <Layout
      sideItems={[
        { text: "매장 설정", url: "/storeSetting" },
        { text: "정보 수정", url: "/storeSetting/edit" },
      ]}
    >
      <div>
        {storeList.map((store) => {
          return (
            <button key={store.storeId} onClick={renderStoreEdit}>
              {store.name}
            </button>
          );
        })}
      </div>
    </Layout>
  );
}
