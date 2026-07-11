interface Log {
    uid: string;
    gc: number;
    ens: number;
}

interface LogsTableProps {
    logs: Log[];
}

function LogsTable({ logs }: LogsTableProps) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4">
                <thead>
                    <tr className="text-gray-500 text-sm">
                        <th className="font-normal text-center">UID</th>
                        <th className="font-normal text-center">GC</th>
                        <th className="font-normal text-center">ENS</th>
                    </tr>
                </thead>

                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index} className="text-gray-500 text-sm">
                            <td className="py-1 text-center w-32 xl:w-130">{log.uid}</td>
                            <td className="text-center">{log.gc.toLocaleString()}</td>
                            <td className="text-center">
                                {log.ens.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LogsTable;