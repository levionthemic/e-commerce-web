import Product from '~/components/Product/Product'
import pic1 from '~/assets/picture1.webp'
import pic2 from '~/assets/picture2.webp'
import { AlignJustify } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Label } from '~/components/ui/label'

function AllProductsTab() {
  const product= {
    '_id': '67da753807afbe0b444c103b',
    'name': 'Giày sneaker nam thể thao',
    'description': 'Giày sneaker nam phong cách trẻ trung, êm ái, đế cao su chống trượt.',
    'features': [
      {
        'field': 'Chất liệu',
        'content': 'Da tổng hợp và vải lưới'
      },
      {
        'field': 'Màu sắc',
        'content': 'Trắng, Đen'
      },
      {
        'field': 'Size',
        'content': '39 - 44'
      }
    ],
    'avgPrice': 599000,
    'medias': [],
    'avatar': 'https://res.cloudinary.com/djxo5a9x6/image/upload/v1742372042/z0jekwr6prjxcq2k5h5k.jpg',
    'rating': 0,
    'sold': 0,
    'score': 0,
    'createdAt': 1710851200000,
    'updatedAt': 1710851200000,
    '_deleted': false,
    'types': [
      {
        'typeId': '67da753807afbe0b444c2001',
        'typeName': 'Giày sneaker nam thể thao - Trắng - Size 40',
        'price': 590000,
        'discount': 0,
        'stock': 100
      },
      {
        'typeId': '67da753807afbe0b444c2002',
        'typeName': 'Giày sneaker nam thể thao - Trắng - Size 42',
        'price': 600000,
        'discount': 0,
        'stock': 80
      },
      {
        'typeId': '67da753807afbe0b444c2003',
        'typeName': 'Giày sneaker nam thể thao - Đen - Size 40',
        'price': 595000,
        'discount': 0,
        'stock': 120
      },
      {
        'typeId': '67da753807afbe0b444c2004',
        'typeName': 'Giày sneaker nam thể thao - Đen - Size 42',
        'price': 610000,
        'discount': 0,
        'stock': 90
      }
    ],
    'category': {
      '_id': '67da766d07afbe0b444c1044',
      'name': 'Thời trang nam',
      'description': 'Danh mục quần áo, giày dép, phụ kiện thời trang dành cho nam giới.',
      'avatar': 'https://res.cloudinary.com/djxo5a9x6/image/upload/v1742738885/yyqvrooslwrssgbhtbu6.jpg',
      'parentCategoryId': null,
      'childrenCategoryId': [],
      '_deleted': false,
      'createdAt': 1710851200000,
      'updatedAt': 1710851200000
    },
    'brand': {
      '_id': '67da78cb07afbe0b444c1053',
      'name': 'Adidas',
      'description': 'Thương hiệu thời trang thể thao và giày nổi tiếng đến từ Đức.',
      'avatar': 'https://res.cloudinary.com/djxo5a9x6/image/upload/v1742738484/gn63okbh66n9s0gj6qww.jpg',
      '_deleted': false,
      'createdAt': 1710832800000,
      'updatedAt': 1710832800000
    },
    'seller': {
      '_id': '67da740249640e6c5c000c01',
      'email': 'liem.levicoding834124@gmail.com',
      'password': '$2b$08$fb8EuMom2L1KqQ2A6rv.7.66EcMh2xZMc0j6JBsz3jVTHyxkVtrSK',
      'username': 'liem.levicoding834124',
      'isVerified': true,
      'verifyToken': null,
      'score': 0,
      'createdAt': 1742369794535,
      'updatedAt': null,
      '_deleted': false,
      'avatar': 'https://res.cloudinary.com/djxo5a9x6/image/upload/f_auto,q_auto/v1/sellers/mjhl9nbul8fqr3bfnutd?_a=BAMAJacc0',
      'status': 'active',
      'description': '\n        ✨ LEVI Store - Thời Trang Đẳng Cấp, Phong Cách Bền Vững ✨\n        Chào mừng bạn đến với LEVI Store, nơi mang đến những sản phẩm thời trang chất lượng cao, thiết kế tinh tế và đậm chất cá tính. Chúng tôi tự hào cung cấp các bộ sưu tập mới nhất, từ quần jeans, áo thun, sơ mi đến phụ kiện cao cấp, giúp bạn tự tin thể hiện phong cách riêng.\n        💎 Cam kết của chúng tôi: <br />\n        ✔ Sản phẩm chính hãng, chất lượng cao <br />\n        ✔ Chính sách đổi trả linh hoạt, bảo hành uy tín <br />\n        ✔ Giao hàng nhanh chóng, tiện lợi\n      ',
      'foundedDate': '2025-02-22T17:00:00.000Z',
      'name': 'LEVI Store',
      'address': '123 đường ABC, phường X',
      'phone': '0798576809',
      'socialNetworks': [
        '',
        '',
        ''
      ]
    }
  }
  return (
    <div className='bg-[#F5F5FA]'>
      <div className="container mx-auto text-white py-10">
        <div className="bg-white w-full text-black grid grid-cols-3 gap-5 p-3 rounded-lg">
          <div className="flex items-center justify-between gap-10 bg-red-200 p-5 ">
            <div className="text-red-700">Giảm 15k<br />Đơn hàng 99k<br />HSD:22/12/2222</div>
            <div className="bg-red-500 text-white w-fit h-fit py-2 px-5">Lưu</div>
          </div>
          <div className="flex items-center justify-between gap-10 bg-red-200 p-5">
            <div className="text-red-700">Giảm 15k<br />Đơn hàng 99k<br />HSD:22/12/2222</div>
            <div className="bg-red-500 text-white w-fit h-fit py-2 px-5">Lưu</div>
          </div>
          <div className="flex items-center justify-between gap-10 bg-red-200 p-5">
            <div className="text-red-700">Giảm 15k<br />Đơn hàng 99k<br />HSD:22/12/2222</div>
            <div className="bg-red-500 text-white w-fit h-fit py-2 px-5">Lưu</div>
          </div>
        </div>
        <div className='bg-white rounded-lg my-10 p-6'>
          <div className="text-xl text-gray-600 mb-3">Gợi ý cho bạn</div>
          <div className="grid grid-cols-5 gap-5">
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
          </div>
        </div>
        <div className="p-6 bg-white my-10 rounded-lg">
          <div className="w-full"><img className='w-full' src={pic1}/></div>
          <div className="w-full"><img className='w-full' src={pic2}/></div>
        </div>
        <div className="flex gap-6">
          <div className="text-black w-[20%] sticky top-36 max-h-[calc(100vh-170px)] overflow-y-auto bg-white rounded-lg p-4">
            <div className='text-xl flex gap-2 pb-3'><AlignJustify /> Danh mục</div>
            <RadioGroup defaultValue="makeup_remove">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="makeup_remove" id="r1" />
                <Label htmlFor="r1">Nước tẩy trang</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="makeup_remove_cotton" id="r2" />
                <Label htmlFor="r2">Bông tẩy trang</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cleanser" id="r3" />
                <Label htmlFor="r3">Sữa rửa mặt</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="water_cleanser" id="r3" />
                <Label htmlFor="r3">Nước dung dịch</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-4 grid-rows-4 flex-1 gap-3">
            {[...Array(40)].map((_, index) => {
              return (<Product key={index} product={product}/>)
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllProductsTab