import styles from './AddCafe.module.scss'
import Input from '../Input/Input';
import SelectCity from '../Select/SelectCity/SelectCity';
import { TextField } from '@mui/material';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import Button from '../Button/Button'
import AutorenewIcon from "@mui/icons-material/Autorenew";import { useState, useEffect } from 'react';
import { postCafe } from '../../api/cafe';
import { getCities } from "../../api/cities";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

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


// {
//     “city”: “xxx”,V
//     "name": "xxx",V
//     "cover": "xxx",V
//     “intro”: “xxx”,
//     ”description”: “xxx”,
//     “address”: “xxx”,V
//     “tel”: “xxx”,V
//     “menu1”: “xxx”,V
//     “menu2”: “xxx”,V
//     “menu3”: “xxx”,V
//     “menu4”: “xxx”,V
//     “menu5”: “xxx”V
// }

export default function AddCafe() {
  const [city, setCity] = useState("");
  const [citySlot, setCitySlot] = useState([]);
  const [cafeName, setCafeName] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [intro, setIntro] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [menuImages, setMenuImages] = useState(Array(5).fill(null));

  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate()


  ////Upload Image/////////
  const handleImgChange = (event, type) => {
    if (!event.target.files[0]) {
      return;
    }
    const selectedFile = event.target.files[0];
    if (type === "cover") {
      setCoverImage(selectedFile);
    } else if (type.startsWith("menu")) {
      const menuIndex = parseInt(type.substr(4), 10) - 1;
      const newMenuImages = [...menuImages];
      newMenuImages[menuIndex] = selectedFile;
      setMenuImages(newMenuImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cafeData = new FormData();
    cafeData.append("city", city);
    cafeData.append("name", cafeName);
    cafeData.append("cover", coverImage);
    cafeData.append("intro", intro);
    cafeData.append("description", description);
    cafeData.append("address", address);
    cafeData.append("tel", tel);

    menuImages.forEach((menuImage, index) => {
      cafeData.append(`menu${index + 1}`, menuImage);
    });

    // 顯示等待動畫
    setLoading(true);

    //////debugger//////
    console.log("city:", city);
    console.log("cafeName:", cafeName);
    console.log("coverImage:", coverImage);
    console.log("intro:", intro);
    console.log("description:", description);
    console.log("address:", address);
    console.log("tel:", tel);
    console.log("menuImages:", menuImages);
    /////////////////////

    try {
      const response = await postCafe(cafeData);

      if (response.status === "success") {
        console.log("Cafe added successfully.");
        navigate(`/store/time/${response.id}`);
      } else {
        console.error("postCafe failed", cafeData);
      }
    } catch (error) {
      console.error("postCafe error", error);
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
    console.log(city);
  };

  return (
    <ThemeProvider theme={themePicker}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>Add Your Cafe</h1>
          <div className={styles.text}>
            <p>Want to make your café shine?</p>
            <p>Need a smarter way to manage bookings?</p>
            <p>Add your café here!"</p>
          </div>
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
                {coverImage ? (
                  <img
                    className={styles.selectedImage}
                    src={URL.createObjectURL(coverImage)}
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
              {menuImages.map((menuImage, index) => (
                <div key={index} className={styles.menuImage}>
                  <label className={styles.upload} htmlFor={`menu${index + 1}`}>
                    {menuImage ? (
                      <img
                        className={styles.selectedImage}
                        src={URL.createObjectURL(menuImage)}
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
                text='Add Cafe Information'
                // size={size}
                onClick={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}