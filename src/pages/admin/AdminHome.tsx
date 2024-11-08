import { Link } from 'react-router-dom';

function AdminHome() {
  return (
    <div>
      <div>Home admin</div>
      <table>
        <thead>
          <tr>
            <th>Danh sách chức năng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link to={'/admin/product/create'}>Go to add product</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminHome;
