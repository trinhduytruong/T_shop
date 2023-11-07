import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { MdTrackChanges } from "react-icons/md";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  // onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* change password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/* address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>

  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "76366hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 prm",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      // cellClassName: (params) => {
      //   return params.getValue(params.id, "status") === "Delivered"
      //     ? "greenColor"
      //     : "redColor";
      // },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      // renderCell: (params) => {
      //   return (
      //     <>
      //       <Link to={`/user/order/${params.id}`}>
      //         <Button>
      //           <AiOutlineArrowRight size={20} />
      //         </Button>
      //       </Link>
      //     </>
      //   );
      // },
      renderCell: () => {
        return (
          <>
            <Button>
              <AiOutlineArrowRight size={20} color="black" />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        // checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "76366hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 prm",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      // cellClassName: (params) => {
      //   return params.getValue(params.id, "status") === "Delivered"
      //     ? "greenColor"
      //     : "redColor";
      // },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      // renderCell: (params) => {
      //   return (
      //     <>
      //       <Link to={`/user/order/${params.id}`}>
      //         <Button>
      //           <AiOutlineArrowRight size={20} />
      //         </Button>
      //       </Link>
      //     </>
      //   );
      // },
      renderCell: () => {
        return (
          <>
            <Button>
              <AiOutlineArrowRight size={20} color="black" />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        // checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "76366hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 prm",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      // cellClassName: (params) => {
      //   return params.getValue(params.id, "status") === "Delivered"
      //     ? "greenColor"
      //     : "redColor";
      // },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      // renderCell: (params) => {
      //   return (
      //     <>
      //       <Link to={`/user/order/${params.id}`}>
      //         <Button>
      //           <AiOutlineArrowRight size={20} />
      //         </Button>
      //       </Link>
      //     </>
      //   );
      // },
      renderCell: () => {
        return (
          <>
            <Button>
              <MdTrackChanges size={20} color="black" />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        // checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

const ChangePassword = () => {
	// const dispatch = useDispatch();
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const passwordChangeHandler = (e) => {
		e.preventDefault();
		// dispatch(updateUserPassword({oldPassword, newPassword, confirmPassword}));
	};

	return (
		<div className="w-full flex justify-center">
			<div className="w-[80%] md:w-[50%]">
				<div className="text-center  ">
					<h1 className="text-[20px] font-[600] p-5">Change password</h1>
				</div>
				<form
					aria-required
					onSubmit={passwordChangeHandler}
					className="flex flex-col items-center"
				>
					<div className=" w-[100%]  ">
						<label className="block pb-1">Enter your old password</label>
						<input
							type="password"
							className={`${styles.input} !w-[95%] mb-5 800px:mb-0`}
							required
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
						/>
					</div>
					<div className=" w-[100%]  mt-2">
						<label className="block pb-1">Enter your new password</label>
						<input
							type="password"
							className={`${styles.input} !w-[95%] mb-5 800px:mb-0`}
							required
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</div>
					<div className=" w-[100%] mt-2">
						<label className="block pb-1">Enter your confirm password</label>
						<input
							type="password"
							className={`${styles.input} !w-[95%] mb-5 800px:mb-0`}
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<input
							className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
							required
							value="Update"
							type="submit"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

const Address = () => {
 return (
  <div className="w-full px-5">
    <div className="flex w-full items-center justify-between">
      <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
        My Address
      </h1>
      <div className={`${styles.button} !rounded-md`}>
        <span className="text-[#fff]">Add New</span>
      </div>
    </div>
    <br />
    <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
      <div className="flex items-center">
        <h5 className="pl-5 font-[600]">Default</h5>
      </div>
      <div className="pl-8 flex items-center">
        <h6>499 Lang Ha, Dong Da, Ha Noi, VietNam</h6>
      </div>
      <div className="pl-8 flex items-center">
        <h6>(84) 123-456-789</h6>
      </div>
      <div className="min-w-[10%] flex items-center justify-between pl-8">
        <AiOutlineDelete size={25} className="cursor-pointer" />
      </div>
    </div>
  </div>
 )
}

export default ProfileContent;
