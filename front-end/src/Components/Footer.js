import shopeefoodLogo from '../assets/shopeefoodlogo.jpg';

function Footer() {
    return(
        <div style = {{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
        }}>
            <div>
                <p style = {{fontSize: '18px', marginBottom: '10px'}}>Công ty</p>
                <p style = {{color: 'blue'}}>Giới thiệu</p>
                <p style = {{color: 'blue'}}>Trung tâm trợ giúp</p>
                <p style = {{color: 'blue'}}>Điều khoản sử dụng</p>
            </div>
            <div style = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <p style = {{fontSize: '18px', marginBottom: '10px'}}>Ứng dụng NotShoppeFood</p>
                <img style = {{
                    height: '100px',
                    width: '100px',
                    borderRadius: '10px'
                }} src = {shopeefoodLogo}></img>
            </div>
            <div>
                <p style = {{fontSize: '18px', marginBottom: '10px'}}>Địa chỉ công ty</p>
                <p style = {{color: 'blue'}}>Số 14, Quản Trọng Hoàng, Ninh Kiều</p>
                <p style = {{color: 'blue'}}>Khu 2, đại học Cần Thơ</p>
            </div>
        </div>
    );
}

export default Footer;