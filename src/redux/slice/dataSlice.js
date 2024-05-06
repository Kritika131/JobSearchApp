import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let initialState=  {
    data: [],
    status: 'idle',
    error: null,
    totalCount:0,
  }

export const fetchData = createAsyncThunk(
  'yourFeature/fetchData',
  async ({limit,offset}, thunkAPI) => {
    const myHeaders = new Headers({
      "Content-Type": "application/json"
    });

    const body = JSON.stringify({
     limit,
      offset
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body
    };

    const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
    const data = await response.json();
    return data;
  }
);

const yourFeatureSlice = createSlice({
  name: 'yourFeature',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.jdList;
        state.totalCount=action.payload.totalCount;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default yourFeatureSlice.reducer;
