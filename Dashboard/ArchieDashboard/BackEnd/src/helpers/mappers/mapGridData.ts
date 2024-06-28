import { transformSize } from '../transform';
import { GridItem } from '../../module/backupmetrics/types/GridItem';
import { MetricsMapperResult } from '../../module/backupmetrics/types/Mappers/MetricsMapper';
import roundToDecimals from '../roundToDecimals';

export default function mapGridData(companyList: string[], companyData: any[]): GridItem[] {
  const data: GridItem[] = [];
  companyList.forEach((company: string) => {
    if (data.findIndex((element: GridItem) => element.Source === company) === -1) {
      data.push({
        Source: company,
        BackupDate: 0,
        Sizes: {
          Total: 0,
          MFCP: 0,
          Rest: 0,
          CO: 0,
          US: 0,
          ACT_US: 0
        }
      });
    }
  });

  companyData.forEach((company: MetricsMapperResult) => {
    const dataIndex = data.findIndex((element: GridItem) => element.Source === company.Source);
    if (dataIndex !== -1) {
      data[dataIndex].BackupDate = company.BackupDate;
      switch (company.Type) {
        case 'database_size':
          data[dataIndex].Sizes.Total = transformSize(Number(company.IntData));
          break;
        case 'mfcp_size':
          data[dataIndex].Sizes.MFCP = transformSize(Number(company.IntData));
          break;
        case 'corresp_size':
          data[dataIndex].Sizes.CO = transformSize(Number(company.IntData));
          break;
        case 'users':
          data[dataIndex].Sizes.US = Number(company.IntData);
          break;
        case 'active_users':
          data[dataIndex].Sizes.ACT_US = Number(company.IntData);
          break;
        default:
          break;
      }
    }
  });

  for (let i = 0; i < data.length; i += 1) {
    data[i].Sizes.Total = roundToDecimals(data[i].Sizes.MFCP + data[i].Sizes.Total, 1);
    data[i].Sizes.CO = data[i].Sizes.Total === 0 ? 0 : Math.round((data[i].Sizes.CO / data[i].Sizes.Total) * 100);
    data[i].Sizes.Rest = data[i].Sizes.Total === 0 ? 0 : Math.round(100 - data[i].Sizes.CO);
  }

  return data;
}
