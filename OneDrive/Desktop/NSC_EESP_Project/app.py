import streamlit as st
import pandas as pd
import joblib

# --------------------------------------------------
# Page Config
# --------------------------------------------------
st.set_page_config(
    page_title="NSC – EESP Analysis & Prediction",
    layout="wide"
)

st.markdown(
    """
    <h1 style='text-align:center;color:#0E4C92;'>
    ⚡ NSC – EESP Analysis & Prediction Dashboard
    </h1>
    <p style='text-align:center;color:gray;'>
    Real utility data • Analytics • ML-based future planning
    </p>
    <hr>
    """,
    unsafe_allow_html=True
)

# --------------------------------------------------
# Load data from CSV (Cloud-safe)
# --------------------------------------------------
@st.cache_data
def load_data():
    return pd.read_csv(
        "nsc_data.csv",
        encoding="latin-1",
        low_memory=False
    )

df = load_data()
st.success("Data loaded successfully ✅")

# --------------------------------------------------
# Dropdown values
# --------------------------------------------------
sub_divs = sorted(df["SUB_DIV_ID"].dropna().unique().tolist())
conn_types = sorted(df["CONN_TYPE"].dropna().unique().tolist())
phases = sorted(df["APPPHASE"].dropna().unique().tolist())

# --------------------------------------------------
# Dataset Overview
# --------------------------------------------------
st.header("📊 Dataset Overview")

c1, c2, c3 = st.columns(3)
c1.metric("Total Records", df.shape[0])
c2.metric("Total Columns", df.shape[1])
c3.metric("Missing Values", int(df.isna().sum().sum()))

with st.expander("🔍 View Sample Data"):
    st.dataframe(df.head(30))

# --------------------------------------------------
# Future Demand Prediction Section
# --------------------------------------------------
st.header("🔮 Future Demand Prediction")

col1, col2, col3 = st.columns(3)

with col1:
    ml_sub = st.selectbox("Select Sub-Division", sub_divs)

with col2:
    ml_cat = st.selectbox("Select Consumer Category", conn_types)

with col3:
    ml_phase = st.selectbox("Select Current Phase", phases)

col4, col5 = st.columns(2)

with col4:
    month = st.selectbox(
        "Select Month",
        list(range(1, 13)),
        format_func=lambda x: pd.to_datetime(str(x), format="%m").strftime("%B")
    )

with col5:
    input_load = st.number_input(
        "Expected Load (kW)",
        min_value=0.0,
        step=1.0
    )

# --------------------------------------------------
# Prediction Logic
# --------------------------------------------------
if st.button("🚀 Predict Future Demand"):

    # Use correct column instead of KW
    base_load = df["SANC_LOAD"].fillna(0).mean()
    predicted_load = base_load + (input_load * 0.3)

    # Rule-based interpretation
    if predicted_load < 50:
        hotspot = "Low Demand Zone"
        required_phase = "Single Phase"
        capacity = round(predicted_load * 1.1, 2)
    elif predicted_load < 100:
        hotspot = "Medium Demand Zone"
        required_phase = "Three Phase (Recommended)"
        capacity = round(predicted_load * 1.2, 2)
    else:
        hotspot = "High Demand Zone"
        required_phase = "Three Phase (Mandatory)"
        capacity = round(predicted_load * 1.3, 2)

    # Output
    st.success("✅ Future Demand Prediction Completed")

    st.markdown(f"""
    ### 📌 Prediction Results
    🔥 **Future Request Hotspot:** {hotspot}  
    ⚡ **Predicted Load (Estimation):** {predicted_load:.2f} kW  
    🔌 **Required Phase:** {required_phase}  
    🏗️ **Recommended Capacity:** {capacity} kW  
    📍 **Sub-Division:** {ml_sub}  
    👥 **Consumer Type:** {ml_cat}  
    📅 **Month:** {pd.to_datetime(str(month), format='%m').strftime('%B')}  
    """)

# --------------------------------------------------
# Footer
# --------------------------------------------------
st.markdown("---")
st.caption("Final Year Project | NSC – EESP | Streamlit • ML • Data Analytics")
