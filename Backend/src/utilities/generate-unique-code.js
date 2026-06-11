const generateUniqueCode = async (modelName, prefix) => {
    const latestRecord = await db[modelName].findFirst({
        orderBy: { createdAt: "desc" },
        select: { code: true }
    });

    let nextNumber = 1;

    if (latestRecord?.code) {
        const parts = latestRecord.code.split("-");
        nextNumber = Number(parts[1]) + 1;
    }

    return `${prefix}-${nextNumber}`;
};

export default generateUniqueCode;