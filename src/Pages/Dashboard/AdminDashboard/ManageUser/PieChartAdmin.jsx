
import { PieChart, Pie} from 'recharts';



const PieChartAdmin = ({users, posts}) => {


    const data01 = [
        { name: 'Group A', value: posts?.length },
        { name: 'Group A', value: users.length },
       ,
    ];
    const data02 = [
        { name: posts?.title, value: posts?.length },
        { name: users?.name, value: users.length },
      
    ];

    return (
        <div className='flex justify-center'>
           
                <PieChart width={500} height={500}>
                    <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                    <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                </PieChart>
       
        </div>
    );
};

export default PieChartAdmin;