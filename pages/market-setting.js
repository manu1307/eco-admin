import Layout from "../components/UI/Layout/Layout";

// {"name":"맘스터치",
// "phoneNumber":"01012341234"
// ,"basePrice":3000,
// "basePoint":300,
// "description":"가게 설명입니다",
// "address":"서울시 동작구",
// "latitude":37.5576984952347,
// "longitude":127.079226104632,
// "tagStores":[{"tagId":1,"tagName":"맛있는 아메리카노","check":true}]}

export default function MarketSetting() {
  return (
    <Layout sideItems={[{ text: "매장 설정", url: "/market-setting" }]}>
      <form className="pl-5 pt-5">
        <div className="grid gap-6 mb-2 md:grid-cols-2">
          <div>
            <label
              htmlFor="store_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              가게 이름
            </label>
            <input
              type="text"
              id="store_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="가게 이름"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              전화번호
            </label>
            <input
              type="tel"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="123-45-678"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required=""
            />
          </div>
        </div>
        <div className="mb-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            가게 한줄 설명
          </label>
          <input
            type="text"
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="가게 설명입니다."
            required=""
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            주소
          </label>
          <input
            type="text"
            id="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="서울시 강남구"
            required=""
          />
        </div>
        <div className="mb-2">
          <label for="appt">월요일 영업시간</label>
          <input
            className="rounded-lg"
            type="time"
            id="appt"
            name="appt"
            min="05:00"
            max="24:00"
            required
          ></input>
        </div>
        <div className="mb-2">
          <label for="appt">화요일 영업시간</label>
          <input
            className="rounded-lg"
            type="time"
            id="appt"
            name="appt"
            min="05:00"
            max="24:00"
            required
          ></input>
        </div>{" "}
        <div className="mb-2">
          <label for="appt">수요일 영업시간</label>
          <input
            className="rounded-lg"
            type="time"
            id="appt"
            name="appt"
            min="05:00"
            max="24:00"
            required
          ></input>
        </div>{" "}
        <div className="mb-2">
          <label for="appt">목요일 영업시간</label>
          <input
            className="rounded-lg"
            type="time"
            id="appt"
            name="appt"
            min="05:00"
            max="24:00"
            required
          ></input>
        </div>{" "}
        <div className="mb-2">
          <label for="appt">금요일 영업시간</label>
          <input
            className="rounded-lg"
            type="time"
            id="appt"
            name="appt"
            min="05:00"
            max="24:00"
            required
          ></input>
        </div>{" "}
        <div className="mb-2">
          <label for="appt">토요일 영업시간</label>
          <input
            className="rounded-lg"
            type="time"
            id="appt"
            name="appt"
            min="05:00"
            max="24:00"
            required
          ></input>
        </div>{" "}
        <div className="mb-2">
          <label for="appt">일요일 영업시간</label>
          <input
            className="rounded-lg"
            type="time"
            id="appt"
            name="appt"
            min="05:00"
            max="24:00"
            required
          ></input>
        </div>{" "}
        <div className="mb-2">
          <label
            htmlFor="tagIds"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            태그 (수정 불가)
          </label>
          <input
            type="text"
            id="tagIds"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="#아메리카노"
            disabled
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </Layout>
  );
}
