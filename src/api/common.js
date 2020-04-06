export default {
  querySeriers() {
    return [
      {
        seriesNumber: '1001',
        seriesDescription: '序列1001',
        imageIds: [
          'dicomweb://localhost:8585/static/testDICOM/MRStudy/MR000000.dcm',
          'dicomweb://localhost:8585/static/testDICOM/MRStudy/MR000001.dcm',
          'dicomweb://localhost:8585/static/testDICOM/MRStudy/MR000002.dcm',
          'dicomweb://localhost:8585/static/testDICOM/MRStudy/MR000003.dcm',
          'dicomweb://localhost:8585/static/testDICOM/MRStudy/MR000003.dcm',
          'dicomweb://localhost:8585/static/testDICOM/MRStudy/MR000004.dcm',
          'dicomweb://localhost:8585/static/testDICOM/MRStudy/MR000005.dcm',
          'dicomweb://localhost:8585/static/testDICOM/MRStudy/MR000006.dcm',
          'dicomweb://localhost:8585/static/testDICOM/MRStudy/MR000007.dcm',
          'dicomweb://localhost:8585/static/testDICOM/MRStudy/MR000008.dcm'
        ]
      },
      {
        seriesNumber: '1002',
        seriesDescription: '序列1002',
        imageIds: [
          'dicomweb://localhost:8585/static/testDICOM/CTStudy/1.519KB.dcm',
          'dicomweb://localhost:8585/static/testDICOM/CTStudy/2.516KB.dcm',
          'dicomweb://localhost:8585/static/testDICOM/CTStudy/3.79KB.dcm'
        ]
      }
    ]
  }
}
