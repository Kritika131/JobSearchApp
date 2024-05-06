import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let initialState=  {
    data: [],
    filteredData:[],
    status: 'idle',
    error: null,
    totalCount:0,
  }

export const fetchData = createAsyncThunk(
  'job/fetchData',
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

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setDataByFilter: (state, action) => {
      state.filteredData= action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = [...state.data, ...action.payload.jdList];
        state.totalCount=action.payload.totalCount;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setDataByFilter } = jobSlice.actions

export default jobSlice.reducer;
