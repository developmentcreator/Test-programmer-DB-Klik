const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const csvWriter = require("csv-writer").createObjectCsvWriter;

// Fungsi untuk mengambil halaman Wikipedia
async function fetchKabupatenList() {
  try {
    const { data } = await axios.get("https://id.wikipedia.org/wiki/Daftar_kabupaten_di_Indonesia");
    const $ = cheerio.load(data);

    const kabupatenList = [];

    // Menargetkan tabel yang berisi daftar kabupaten
    $("table.wikitable tbody tr").each((index, element) => {
      const kabupaten = $(element).find("td:nth-child(2)").text().trim();
      const provinsi = $(element).find("td:nth-child(3)").text().trim();
      if (kabupaten && provinsi) {
        kabupatenList.push({ kabupaten, provinsi });
      }
    });

    return kabupatenList;
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

// Fungsi untuk menulis ke file CSV
async function writeToCSV(kabupatenList) {
  const csvWriterInstance = csvWriter({
    path: "daftar_kabupaten.csv",
    header: [
      { id: "kabupaten", title: "Kabupaten" },
      { id: "provinsi", title: "Provinsi" },
    ],
  });

  try {
    await csvWriterInstance.writeRecords(kabupatenList);
    console.log("Data berhasil disimpan ke daftar_kabupaten.csv");
  } catch (error) {
    console.error("Error writing CSV:", error);
  }
}

// Fungsi utama untuk menjalankan scraping dan menyimpan data ke CSV
async function main() {
  const kabupatenList = await fetchKabupatenList();
  if (kabupatenList && kabupatenList.length > 0) {
    await writeToCSV(kabupatenList);
  }
}

main();
