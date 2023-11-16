import React, { useEffect, useState, useRef } from "react";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { createEvent } from "../../redux/actions/event";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  // const {success, error} = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const utcOffset = -new Date().getTimezoneOffset();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [minEndDate, setMinEndDate] = useState(new Date());
  const { error, success, event } = useSelector((state) => state.event);

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleCloseImage = (index) => {
    let copyImages = [...images];
    copyImages.splice(index, 1);
    setImages(copyImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append(
      "start_Date",
      // new Date(startDate.getTime() + utcOffset * 60 * 1000).toISOString()
      moment(startDate).format("YYYY-MM-DD")
    );
    newForm.append(
      "Finish_Date",
      // new Date(startDate.getTime() + utcOffset * 60 * 1000).toISOString()
      moment(endDate).format("YYYY-MM-DD")
    );
    dispatch(createEvent(newForm));
  };
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      // Skip the code on component mount
      isInitialMount.current = false;
    } else {
      // Code to run when error or success changes
      if (error) {
        toast.error(error);
      }
      if (success) {
        toast.success("Created Successfully");
        navigate("/dashboard");
        window.location.reload();
      }
    }
  }, [dispatch, error, success, event]);
  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
      {/* create event form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your event product name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your event product description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your event product tags..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your event product price..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your event product price with discount..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your event product stock..."
          />
        </div>
        <br />
        <div className="flex flex-col">
          <label className="pb-2">
            Event Start Date <span className="text-red-500">*</span>
          </label>

          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setMinEndDate(date.getTime() + 3 * 24 * 60 * 60 * 1000);
            }}
            minDate={new Date()}
            showIcon
            dateFormat="dd/MM/yyyy"
            className="border border-gray-300 rounded-[3px] w-full"
          />
        </div>
        <br />
        <div className="flex flex-col">
          <label className="pb-2">
            Event End Date <span className="text-red-500">*</span>
          </label>

          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
            minDate={minEndDate}
            showIcon
            dateFormat="dd/MM/yyyy"
            className="border border-gray-300 rounded-[3px] w-full"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            // required
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
            accept="image/png, image/jpeg"
          />
          <div className="w-full flex items-center flex-wrap gap-2">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((image, index) => (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="object-cover w-[100px] h-[100px] "
                  />
                  <AiOutlineCloseCircle
                    className="w-5 h-5 absolute top-0 right-0 text-red-500 cursor-pointer"
                    onClick={() => handleCloseImage(index)}
                  />
                </div>
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
