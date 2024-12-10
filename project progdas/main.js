var semuaProduk = []; // Array untuk menyimpan semua data produk
var kodeIncrement = 1; // Variabel untuk membuat kode produk otomatis increment

// untuk mode edit
var modeEdit = false;

// index produk yang mau diedit
var indexProdukEdit = null;

// Fungsi untuk menyimpan data produk baru atau memperbarui data produk lama
function menyimpanProduk () {
    // Mengambil nilai input dari form
    var kodeProduk = document.getElementById('kode-produk').value;
    var namaProduk = document.getElementById('nama-produk').value;
    var hargaProduk = document.getElementById('harga-produk').value;
    var satuanProduk = document.getElementById('satuan-produk').value;
    var kategoriProduk = document.getElementById('kategori-produk').value;
    var urlGambar= document.getElementById('url-gambar').value;
    var stokAwal = document.getElementById('stok-awal').value;


    if (modeEdit) {
         // Jika dalam mode edit, perbarui data produk di indeks yang sesuai
        semuaProduk[indexProdukEdit] = {
            kodeProduk,
            namaProduk,
            hargaProduk,
            satuanProduk,
            kategoriProduk,
            urlGambar,
            stokAwal,
        };

         // Mengembalikan mode ke normal
        modeEdit = false;
        indexProdukEdit = null;
    } else {
        // Jika bukan mode edit, tambahkan produk baru ke array
        semuaProduk.push({
            kodeProduk,
            namaProduk,
            hargaProduk,
            satuanProduk,
            kategoriProduk,
            urlGambar,
            stokAwal,
        });
        
        // Increment kode produk
        kodeIncrement++;
    }

    // Reset kode produk otomatis untuk produk berikutnya
    document.getElementById('kode-produk').value = 'MD-' + String(kodeIncrement).padStart(3, '0');

    // Menampilkan data pada konsol untuk debugging
    console.log(kodeProduk);
    console.log(namaProduk);
    console.log(hargaProduk);
    console.log(satuanProduk);
    console.log(kategoriProduk);
    console.log(urlGambar);
    console.log(stokAwal);
    tampilanTabel(); // Tampilkan data terbaru di tabel
}

// Mengatur nilai awal untuk kode produk
document.getElementById('kode-produk').value = 'MD-' + String(kodeIncrement).padStart(3, '0');


// Fungsi untuk mengedit data produk berdasarkan indeks
function editProduk(index) {
    var produkUntukDiEdit = semuaProduk[index]; // Mendapatkan data produk berdasarkan indeks

    // Mengisi input form dengan data produk yang akan diedit
    document.getElementById('kode-produk').value = produkUntukDiEdit.kodeProduk;
    document.getElementById('nama-produk').value = produkUntukDiEdit.namaProduk;
    document.getElementById('harga-produk').value = produkUntukDiEdit.hargaProduk;
    document.getElementById('satuan-produk').value = produkUntukDiEdit.satuanProduk;
    document.getElementById('kategori-produk').value = produkUntukDiEdit.kategoriProduk;
    document.getElementById('url-gambar').value = produkUntukDiEdit.urlGambar;
    document.getElementById('stok-awal').value = produkUntukDiEdit.stokAwal;

    // Mengaktifkan mode edit
    modeEdit = true;
    indexProdukEdit = index;

}

// Fungsi untuk menghapus data produk berdasarkan indeks
function menghapusProduk(index) {
    // proses hapus data berdasarkan index array
    semuaProduk.splice(index, 1);// Menghapus produk dari array berdasarkan indeks

    // Merender ulang table 
    tampilanTabel(); // Render ulang tabel untuk mencerminkan perubahan
}

// Fungsi untuk menampilkan data produk dalam tabel
function tampilanTabel() {
    var tBody = document.getElementById("isi-data"); // Mendapatkan elemen body tabel

    tBody.innerHTML = ''; // Mengosongkan isi tabel sebelum render ulang

    semuaProduk.forEach(function (produk, index) {
        var tr = tBody.insertRow(); // Membuat baris baru di tabel
        var warning = 'white'; // Warna default untuk stok produk
        var textColor = 'bebas';

        if (produk.stokAwal < 5) {
            warning = 'red'; // Jika stok awal < 5, beri warna merah sebagai peringatan
            textColor = 'black'
        }

        // Menambahkan baris data ke tabel [menggunakan backtick``]
        tr.innerHTML = `
            <td>${index +1}</td>
            <td>${produk.kodeProduk}</td>
            <td>${produk.namaProduk}</td>
            <td>${produk.hargaProduk}</td>
            <td>${produk.satuanProduk}</td>
            <td>${produk.kategoriProduk}</td>
            <td>
                <img src="${produk.urlGambar}" alt="${produk.namaProduk}" width="90px" height="50px">
            </td>
            <td style="background-color: ${warning};
                       color: ${textColor};">${produk.stokAwal}</td>
            <td><button style="background-image: linear-gradient(#FF5AAC, #FFA6CA);
                               border: none; 
                               border-radius: 5px;
                               color: white;" onclick="editProduk(${index})"> edit </button> | 
                <button style="background-image: linear-gradient(#FF5AAC, #FFA6CA);
                               border: none; 
                               border-radius: 5px;
                               color: white;" onclick="menghapusProduk(${index})">delete</button>
            </td>    
        ` ;
    });
}
