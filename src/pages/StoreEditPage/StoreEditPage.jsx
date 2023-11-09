import styles from './StoreEditPage.module.scss'
import Navbar from "../../components/Navbar/Navbar";
import TimeSeatEditPage from "../TimeSeatEditPage/TimeSeatEditPage"
import Footer from "../../components/Footer/Footer";

import Input from "../../components/Input/Input";
import SelectCity from "../../components/Select/SelectCity/SelectCity";
import { TextField } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import Button from "../../components/Button/Button";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useState, useEffect } from "react";
import { putCafe, getCafe } from "../../api/cafe";
import { getCities } from "../../api/cities";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";

const themePicker = createTheme({
  palette: {
    primary: {
      main: "#EBEBEB",
    },
    secondary: {
      main: "#c81d25",
    },
  },

  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },

    MuiInput: {
      styleOverrides: {
        input: {
          color: "white",
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        input: {
          color: "white",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#2F2F2F",
          color: "white",
        },
      },
    },
  },
});

export default function StoreEditPage() {
  const [city, setCity] = useState("");
  const [citySlot, setCitySlot] = useState([]);
  const [cafeName, setCafeName] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [intro, setIntro] = useState("");
  const [description, setDescription] = useState("");
  // const [coverImage, setCoverImage] = useState(null);
  // const [menuImages, setMenuImages] = useState(Array(5).fill(null));

  const [coverImageFile, setCoverImageFile] = useState(null);
  const [menuImageFiles, setMenuImageFiles] = useState(Array(5).fill(null));

  const [coverImageURL, setCoverImageURL] = useState(null);
  const [menuImageURLs, setMenuImageURLs] = useState(Array(5).fill(null));


  const [loading, setLoading] = useState(false);

  // const [cafeOriginData, setCafeOriginData] = useState("")

  const navigate = useNavigate();
  const { id } = useParams()

  ////render the cafe
  useEffect(() => {
    const getCafeData = async () => {
      try {
        const data = await getCafe(id);
        console.log(id);
        if (data.status === "success") {
          // setCafeOriginData(data);
          setCity(data.city)
          setCafeName(data.name)
          setAddress(data.address)
          setTel(data.tel)
          setIntro(data.intro)
          setDescription(data.description)
          
          if (data.cover) {
            setCoverImageFile(null)
            setCoverImageURL(data.cover)
          }

          const updatedMenuImageURLs = Array(5).fill(null);
          for (let i = 1; i <= 5; i++) {
            const menuImageKey = `menu${i}`;
            if (data[menuImageKey]) {
              updatedMenuImageURLs[i - 1] = data[menuImageKey];
            }
          }
          setMenuImageURLs(updatedMenuImageURLs);
        }
      } catch (error) {
        console.log(`[Get cafe data failed]`, error);
      }
    };

    getCafeData();
  }, [id]);

  ////Upload Image/////////
  const handleImgChange = (event, type) => {
    if (!event.target.files[0]) {
      return;
    }
    const selectedFile = event.target.files[0];
    if (type === "cover") {
      setCoverImageFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImageURL(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else if (type.startsWith("menu")) {
      const menuIndex = parseInt(type.substr(4), 10) - 1;
      const newMenuImageFiles = [...menuImageFiles];
      newMenuImageFiles[menuIndex] = selectedFile;
      setMenuImageFiles(newMenuImageFiles);

      const reader = new FileReader();
      reader.onload = () => {
        const newMenuImageURLs = [...menuImageURLs];
        newMenuImageURLs[menuIndex] = reader.result;
        setMenuImageURLs(newMenuImageURLs);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cafeData = new FormData();
    cafeData.append("city", city);
    cafeData.append("name", cafeName);
    cafeData.append("intro", intro);
    cafeData.append("description", description);
    cafeData.append("address", address);
    cafeData.append("tel", tel);

    if (coverImageFile) {
      cafeData.append("cover", coverImageFile);
    }

    menuImageFiles.forEach((menuImage, index) => {
      if (menuImage) {
        cafeData.append(`menu${index + 1}`, menuImage);
      }
    });

    // 顯示等待動畫
    setLoading(true);

    //////debugger//////
    console.log("city:", city);
    console.log("cafeName:", cafeName);
    console.log("coverImage:", coverImageFile);
    console.log("intro:", intro);
    console.log("description:", description);
    console.log("address:", address);
    console.log("tel:", tel);
    console.log("menuImages:", menuImageFiles);
    /////////////////////

    try {
      const response = await putCafe(cafeData, id);

      if (response.status === "success") {
        console.log("Cafe edited successfully.");
        // navigate(`/store/time/${response.id}`);
      } else {
        console.error("putCafe failed", cafeData);
      }
    } catch (error) {
      console.error("putCafe error", error);
    } finally {
      // 無論成功還是失敗，都要隱藏等待動畫
      setLoading(false);
    }
  };

  //For City Select
  useEffect(() => {
    const generateCitySlot = async () => {
      try {
        const citySlot = await getCities(); //prop.api
        if (citySlot.length > 0) {
          console.log(citySlot);
          setCitySlot(citySlot);
        } else {
          setCitySlot(["---"]);
        }
      } catch (error) {
        console.log(`[Get city options failed]`, error);
      }
    };

    generateCitySlot();
  }, []);

  const handleCityChange = (event) => {
    setCity(event.target.value); // 設置所選取的城市
    console.log(event.target.value);
  };

  return (
    <>
      <Navbar />
      <ThemeProvider theme={themePicker}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>Edit Your Cafe</h1>
            <div className={styles.text}></div>
          </div>
          <div className={styles.infoFormWrapper}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputGroup}>
                <p>Cafe Name:</p>
                <Input
                  className={styles.input}
                  type='text'
                  placeholder='Cafe Name'
                  value={cafeName}
                  onChange={(cafeNameInput) => setCafeName(cafeNameInput)}
                  required={true}
                />
              </div>

              <div className={styles.inputGroup}>
                <p>Address:</p>
                <Input
                  className={styles.input}
                  type='text'
                  placeholder='Cafe Address'
                  value={address}
                  onChange={(addressInput) => setAddress(addressInput)}
                  required={true}
                />
              </div>

              <div className={styles.inputGroup}>
                <p>Tel:</p>
                <Input
                  className={styles.input}
                  type='text'
                  placeholder='Cafe Telephone Number'
                  value={tel}
                  onChange={(telInput) => setTel(telInput)}
                  required={true}
                />
              </div>

              <div className={styles.inputGroup}>
                <SelectCity
                  className={styles.cityPicker}
                  variant={"standard"}
                  citySlot={citySlot}
                  value={city}
                  onChange={handleCityChange}
                  required
                />
              </div>

              <div className={styles.introWrapper}>
                <TextField
                  className={styles.textField}
                  label={"Intro"}
                  value={intro}
                  variant='filled'
                  multiline
                  rows={5}
                  fullWidth={true}
                  helperText='Maximum 100 characters.'
                  onChange={(event) => setIntro(event.target.value)}
                  required
                />
              </div>

              <div className={styles.descriptionWrapper}>
                <TextField
                  className={styles.textField}
                  label={"Description"}
                  value={description}
                  variant='filled'
                  multiline
                  rows={5}
                  fullWidth={true}
                  helperText='Maximum 300 characters.'
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.imagesWrapper}>
              <div className={styles.photoImages}>
                <label className={styles.upload} htmlFor='cover'>
                  {coverImageURL ? (
                    <img
                      className={styles.selectedImage}
                      src={coverImageURL}
                      alt='Selected Cover'
                    />
                  ) : (
                    <AddPhotoAlternateIcon className={styles.uploadIcon} />
                  )}
                  <p className={styles.fileText}>Cover</p>
                  <input
                    className={styles.fileInput}
                    type='file'
                    id='cover'
                    name='cover'
                    onChange={(event) => handleImgChange(event, "cover")}
                  />
                </label>
              </div>

              <div className={styles.menuImages}>
                {menuImageURLs.map((menuImageURL, index) => (
                  <div key={index} className={styles.menuImage}>
                    <label
                      className={styles.upload}
                      htmlFor={`menu${index + 1}`}
                    >
                      {menuImageURL ? (
                        <img
                          className={styles.selectedImage}
                          src={menuImageURL}
                          alt={`Selected Menu ${index + 1}`}
                        />
                      ) : (
                        <AddToPhotosIcon className={styles.uploadIcon} />
                      )}
                      <p className={styles.fileText}>{`Menu${index + 1}`}</p>
                      <input
                        className={styles.fileInput}
                        type='file'
                        id={`menu${index + 1}`}
                        name={`menu${index + 1}`}
                        onChange={(event) =>
                          handleImgChange(event, `menu${index + 1}`)
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.submitButton}>
              {loading ? (
                <div className={styles.loading}>
                  <p>Loading...</p>
                  <AutorenewIcon className={styles.loadingButton} />
                </div>
              ) : (
                <Button
                  variant='contained'
                  color='secondary'
                  text='Save'
                  // size={size}
                  onClick={handleSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </ThemeProvider>
      <TimeSeatEditPage />
      <Footer />
    </>
  );
}