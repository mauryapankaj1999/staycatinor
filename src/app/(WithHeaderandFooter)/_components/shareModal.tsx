'use client'
import { useState } from 'react';
import { FaWhatsapp, FaFacebook, FaTwitter, FaTelegram, FaLinkedin, FaEnvelope, FaCopy } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { toastSuccess } from '@/utils/toast';

interface ShareButtonProps {
  url: string;
  title: string;
  text: string;
  children: React.ReactNode;
}

export default function CustomShareButton({ url, title, text, children }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shareButtons = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="text-[#25D366] text-4xl" />,
      onClick: () =>
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
          '_blank'
        ),
    },
    {
      name: 'Facebook',
      icon: <FaFacebook className="text-[#1877F2] text-4xl" />,
      onClick: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        ),
    },
    {
      name: 'Twitter',
      icon: <FaTwitter className="text-[#1DA1F2] text-4xl" />,
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          '_blank'
        ),
    },
    {
      name: 'Telegram',
      icon: <FaTelegram className="text-[#0088cc] text-4xl" />,
      onClick: () =>
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
          '_blank'
        ),
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="text-[#0A66C2] text-4xl" />,
      onClick: () =>
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank'
        ),
    },
    {
      name: 'Email',
      icon: <FaEnvelope className="text-[#EA4335] text-4xl" />,
      onClick: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
      },
    },
    {
      name: 'Copy Link',
      icon: <FaCopy className="text-gray-600 text-4xl" />,
      onClick: async () => {
        await navigator.clipboard.writeText(url);
        toastSuccess('Link copied to clipboard!');
        setIsOpen(false);
      },
    },
  ];

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="w-5 h-5 md:w-7 md:h-7 lg:w-[38px] lg:h-[38px] cursor-pointer"
      >
        {children}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <IoClose size={24} />
            </button>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">Share Profile</h3>

            <div className="grid grid-cols-4 gap-4">
              {shareButtons.map((button) => (
                <button
                  key={button.name}
                  onClick={button.onClick}
                  className="flex items-center justify-center aspect-square p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                  title={button.name}
                  type="button"
                >
                  {button.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
